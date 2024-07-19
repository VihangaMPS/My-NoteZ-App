import TagInput from "../../components/Input/TagInput.jsx";
import {useState} from "react";

const AddEditNotes = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>

                <input
                    type="text"
                    placeholder="Go to Gym"
                    className="text-2xl text-slate-950 outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    placeholder="Content"
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

            <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>ADD</button>
        </div>
    )
}

export default AddEditNotes;