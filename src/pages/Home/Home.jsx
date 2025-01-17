import Navbar from "../../components/Navbar/Navbar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import {MdAdd} from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import {useNavigate} from "react-router-dom";
import {axiosNoteInstance, axiosUserInstance} from "../../utils/axiosInstance.js";
import Toast from "../../components/ToastMessage/Toast.jsx";
import EmptyCard from "../../components/Cards/EmptyCard.jsx";
import AddImage from "../../../public/assets/lists.png"
import noDataImage from "../../../public/assets/document.png"

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null
    });
    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "add"
    });
    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({
            isShown: true,
            type: "edit",
            data: noteDetails
        })
    }
    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message: message,
            type: type
        })
    }
    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: ""
        })
    }
    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    }


    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axiosUserInstance.get("/");

            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login")
            }
        }
    }

    // Get All Notes
    const getAllNotes = async () => {
        try {
            const response = await axiosNoteInstance.get('/');

            if (response.data.data) {
                setAllNotes(response.data.data);
            }
        } catch (error) {
            console.log("An unexpected error occurred! please try again.")
        }
    }

    // Delete Note
    const deleteNote = async (data) => {
        const nodeId = data._id;

        try {
            const response = await axiosNoteInstance.delete(`/${nodeId}`);

            if (response.data && response.data.status ) {
                showToastMessage("Note Deleted Successfully", 'delete');
                await getAllNotes();
            }
        } catch (error) {
            if (error.message && error.message.data && error.message.data.message) {
                console.log("An unexpected error occurred! please try again.")
            }
        }
    }

    // Search Note
    const onSearchNote = async (query) => {
        try {
            const response = await axiosNoteInstance.get("/searchNote", {
                params: {query}
            });

            if (response.data && response.data.data) {
                setIsSearch(true);
                setAllNotes(response.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateIsPinned = async (noteData ) => {
        const nodeId = noteData._id;

        try {
            const response = await axiosNoteInstance.patch(`/${nodeId}`, {
                "isPinned" : !nodeId.isPinned
            });

            if (response.data && response.data.data) {
                console.log("in if")
                showToastMessage("Note Updated Successfully")
                await getAllNotes();
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

            <div className="container mx-auto">
                {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onPinNote={() => updateIsPinned(item)}
                        />
                    ))}
                </div> : <EmptyCard imgSRC={isSearch ? noDataImage : AddImage}
                                    message={isSearch ? `Oops ! No notes found matching your search` : `Start creating your first note! Click the 'Add' button to get down your thoughts, ideas and reminders. Let's get started !`}/>}
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => {setOpenAddEditModal({isShown: true, type: "add", data: null })}}>
                <MdAdd className="text-[32px] text-white"/>
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    // overlay: { backgroundColor: "rgba(0.0.0.0.2)"},
                    backgroundColor: blur(),
                    overflow: scroll()
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
            >
                <AddEditNotes
                    onClose={() => {setOpenAddEditModal({isShown: false, type: "add", data: null})}}
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
        </>
    )
}

export default Home;
