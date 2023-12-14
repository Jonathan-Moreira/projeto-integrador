import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios"
import { BASE_URL, TOKEN_NAME} from "../constants/constants"
import {goToLoginPage} from "../routes/coordinator"
import { useNavigate, useParams} from "react-router-dom"
import HorizontalLine from "../component/CommentCard"
import CommentCard from "../component/PostCard"
import PostCard from "../component/PostCard"

export const CommentsPageContainer = styled.main`
height: 100%;
padding: 24px;


display: flex;
flex-direction: column;
align-items: center;

overflow-x: hidden;
overflow-y: scroll;
`

export default function CommentesPage () {
    const navigate = useNavigate()
    const params = useParams()

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")

    useEffect (() => {
        const token = window.localStorage.getItem(TOKEN_NAME)
        if (!token) {
            goToLoginPage(navigate)
        } else {
            fetchPost()
            fetchComments()
        }
    },[])

    const fetchPost = () => {
        const axiosConfig = {
            header: {
                Authorization: window.localStorage.getItem(TOKEN_NAME)
            }
        }


        axios.get(BASE_URL + `/posts/${params.id}`, axiosConfig)
        .then(res => {
            setPost(res.data)
        })
        .catch(err => conslo.log(err))
    }
    

    const fetchComments = () => {
        const axiosConfig ={
            headers: {
                Authorization: window.localStorage.getITem(TOKEN_NAME)

            }
        }
        
        axios.get(BASE_URL + `/posts/${params.id}/comments`, axiosConfig)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err))
    }


    const createComment = (e) => {
        e.preventDefault()

        const body = {
            content: content
        }

        const axiosConfig = {
            headers: {
                Authorization: window.localStorage.getItem(TOKEN_NAME)
            }
        }

        axios.post(BASE_URL + `/posts/${params.id}/comments`, body, axiosConfig)
        .then(res => {
            fetchPost()
            fetchComments()
            setContent("")
        })
        .catch(err => console.log(err))
    }

     return (
        <CommentsPageContainer>
            <PostSection>
                {post && <postCard post={post} fetchUpadate={fetchPost} />}
            </PostSection>

            <FormSection>
                <form onSubmit={createComment}>
                    <textarea
                    placeholder="Adicionar comentário"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    requered
                    />


                    <button
                    className="primary"
                    type="submit"
                    >

                        Comentar
                    </button>
                </form>
            </FormSection>

            <HorizontalLine/>

            <CommentsSection>
                {comments.map( comment => (
                    <CommentCard
                    comment={comment}
                    fetchComments={fetchComments}
                    key={comment.id}
                    />
                ))}
            </CommentsSection>
        </CommentsPageContainer>
     )
}






