import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AllUsersPage from "./pages/AllUsersPage";
import ChatPage from "./pages/ChatPage";
import ConversationPage from "./pages/ConversationPage";
import Toolbar from "./components/Toolbar";
import Profile from './pages/ProfilePage';
import SingleUserProfilePage from './pages/SingleUserProfilePage';

function App() {


    return (
        <div className="App">
            <BrowserRouter>
                <Toolbar/>
                <Routes>

                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/allUsers" element={<AllUsersPage/>}/>
                    <Route path="/chat/:id" element={<ChatPage/>}/>
                    <Route path="/conversations" element={<ConversationPage/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/userProfile/:username" element={<SingleUserProfilePage/>}/>

                </Routes>

            </BrowserRouter>

        </div>
    );
}

export default App;
