import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios";
import { goToLoginPage } from "../routes/coordinator"
import { BASE_URL, TOKEN_NAME } from "../constants/constants"
import { useNavigate } from "react-router-dom";
import HorizontalLine from "../component/HorizontalLine"
import PostCard from "../component/PostCard"

export const PostsPageContainer = styled.main`
height: 100%;
padding: 24px;

display: flex;
flex-direction: column;
align-items: center;

overflow-x: hidden;
overflow-y: scroll;
`

export const FormSection = styled.section`
display: flex;
flex-direction: column;
width: 100%;

margin-top: 2rem;

`





export default function PostsPage() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [content, setContent] = useState("")

    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_NAME)
        if (!token) {
            goToLoginPage(navigate)
        } else {
            fetchPosts()
        }
    }, [])


    const fetchPosts = () => {
        const axiosConfig = {
            headers: {
                Authorization: window.localStorage.getItem(TOKEN_NAME)
            }
        }

        axios.get(BASE_URL + "/posts", axiosConfig)
            .then(res => {
                setPosts(res.data)
                setContent("")
            })
            .catch(err => console.log(err))
    }


    const createPost = (e) => {
        e.preventDefault()

        const body = {
            content: content
        }

        const axiosConfig = {
            header: {
                Authorization: window.localStorage.getItem(TOKEN_NAME)
            }
        }

        axios.post(BASE_URL + "/posts", body, axiosConfig)
            .then(res => {
                fetchPosts()
            })
            .catch(err => console.log(err))
    }

    return (
        <PostsPageContainer>

            <FormSection>
                <form onSubmit={createPost}>
                    <textarea
                        placeholder="Digite seu post..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <button
                        className="primary"
                        type="submit"
                    >

                        Postar
                    </button>
                </form>
            </FormSection>

            <PostsSection>
                {posts.map((post =>
                    <PostCard
                    post={post}
                    fetchUpadate={fetchPosts}
                    key={post.id}
                    />
                    ))}
            </PostsSection>
        </PostsPageContainer>
    )
}