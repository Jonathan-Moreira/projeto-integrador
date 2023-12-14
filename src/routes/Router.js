import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsPage from "../pages/NotFoundPage"
import NotFoundPage from "../pages/LoginPage"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import CommentsPage from "../pages/CommentsPage"

export default function Router () {
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element = {<PostsPage/>} />
            <Route path="/login" element = {<LoginPage/>} />
            <Route path="/signup" element = {<SignupPage/>} />
            <Route path="/posts/:id" element = {<CommentsPage/>} />
            <Route path="*" element = {<NotFoundPage/>} />
        </Routes>
        </BrowserRouter>
        </>
    )
}