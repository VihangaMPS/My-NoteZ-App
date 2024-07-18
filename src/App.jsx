import Home from "./pages/Home/Home.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate replace to="dashboard"/>}/>
                <Route path="dashboard" index element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
