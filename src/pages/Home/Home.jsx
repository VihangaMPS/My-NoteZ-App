import Navbar from "../../components/Navbar/Navbar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import {MdAdd} from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import {useNavigate} from "react-router-dom";
import {axiosNoteInstance, axiosUserInstance} from "../../utils/axiosInstance.js";

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null
    });

    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([])

    const navigate = useNavigate();

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
            // console.log("response",response);
            // console.log("response.data", response.data);
            // console.log("response.data.data", response.data.data);
            // console.log("response.data.notes",response.data.notes);
            // console.log("response.data.data.notes",response.data.data.notes);

            if (response.data.data) {
                console.log("in if")
                setAllNotes(response.data.data);
            }
        } catch (error) {
            console.log("An unexpected error occurred! please try again.")
        }
    }


    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo}/>

            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => {
                            }}
                            onDelete={() => {
                            }}
                            onPinNote={() => {
                            }}
                        />
                    ))}
                </div>
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
                />
            </Modal>
        </>
    )
}

export default Home;
