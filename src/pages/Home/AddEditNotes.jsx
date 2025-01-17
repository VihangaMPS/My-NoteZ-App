import TagInput from "../../components/Input/TagInput.jsx";
import {useState} from "react";
import {MdClose} from "react-icons/md";
import {axiosNoteInstance} from "../../utils/axiosInstance.js";

const AddEditNotes = ({onClose, type, noteData, getAllNotes, showToastMessage}) => {

    const [title, setTitle] = useState( noteData?.title || "");
    const [content, setContent] = useState( noteData?.content || "");
    const [tags, setTags] = useState( noteData?.tags || []);

    const [error, setError] = useState(null);

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosNoteInstance.post("/", {
                title,
                content,
                tags
            });

            if (response.data && response.data.data) {
                showToastMessage("Note Added Successfully")
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.message && error.message.data && error.message.data.message) {
                setError(error.response.data.message);
            }
        }
    }

    // Edit Note
    const editNote = async () => {
        const nodeId = noteData._id;

        try {
            const response = await axiosNoteInstance.patch(`/${nodeId}`, {
                title,
                content,
                tags
            });

            if (response.data && response.data.data) {
                showToastMessage("Note Updated Successfully")
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.message && error.message.data && error.message.data.message) {
                setError(error.response.data.message);
            }
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title");
            return;
        }
        if (!content) {
            setError("Please enter the content");
            return;
        }
        setError("");

        if (type === 'edit') {
            editNote();
        }else {
            addNewNote();
        }
    }
    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100"
                onClick={onClose}>
                <MdClose className="text-xl text-slate-400"/>
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>

                <input
                    type="text"
                    placeholder="Add a Title"
                    className="text-2xl text-slate-950 outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    placeholder="Add a Content"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags}/>
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>{type === 'edit' ? 'UPDATE' : 'ADD'}</button>
        </div>
    )
}

export default AddEditNotes;