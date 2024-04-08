import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost"
import { useUserPosts } from "../hooks/useUserPosts";
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate } from 'react-router-dom'
import { useDeletePost } from "../hooks/useDeletePost";

const Home = () => {
    const { user } = useAuthContext()
    const { username } = useParams();

    if(user.username !== username){
        return(
            <Navigate to="/"/>
        )
    }


    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const {post, error, isLoading, data} = usePost()

    const {getUserPosts, userPostError, userPostIsLoading, userPostData} = useUserPosts()

    const {deletePost, deleteError, deleteIsLoading, deleteData} = useDeletePost()


    useEffect(() => {
        getUserPosts(username)
    }, [username])

    useEffect(() => {
        getUserPosts(username)
    },[data])

    useEffect(() => {
        getUserPosts(username)
    },[deleteData])

    const publish = async (e) => {
        e.preventDefault()

        await post(title, body, username)
    }

    const deleteButton = (_id) => {
        deletePost(_id)
    }

    return(
        <>

        <form className="publish">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <div></div>
            <textarea 
                cols={45} 
                rows={4} 
                maxLength="100" 
                placeholder="Content here..." 
                reset="true" 
                value={body}
                onChange={(e) => setBody(e.target.value)}
            ></textarea> <br />
            {error && <div className="error">{error}</div>}
            <button disabled={isLoading} onClick={publish}>Publish</button>

        </form>

        {deleteError && 
            <div className="error">{deleteError}</div>
        }

        {userPostData && userPostData.map((post) => (
            <div className="post" key={post?._id}>
                <h3>{post?.title}</h3>
                <p>{post?.body}</p>
                <button disabled={deleteIsLoading} onClick={() => deleteButton(post?._id)}>Delete</button>
            </div>

        ))}

        {userPostError && 
            <div className="error">{error}</div>
        }

        {userPostIsLoading && 
            <div className="loading">Loading...</div>
        }
        </>
    )
}

export default Home
