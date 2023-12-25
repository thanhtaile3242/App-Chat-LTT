import React from "react";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import SetAvatar from "./pages/SetAvatar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/setAvatar" element={<SetAvatar />}></Route>
                <Route path="/chat" element={<Chat />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
