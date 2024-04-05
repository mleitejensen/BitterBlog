import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost"
import { useUserPosts } from "../hooks/useUserPosts";
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate } from 'react-router-dom'

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


    useEffect(() => {
        getUserPosts(username)
    }, [username])

    useEffect(() => {
        getUserPosts(username)
    },[data])

    const publish = async (e) => {
        e.preventDefault()

        await post(title, body, username)
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
            ></textarea>
            {error && <div className="error">{error}</div>}
            <button disabled={isLoading} onClick={publish}>Publish</button>

        </form>

        {userPostData && userPostData.map((post) => (
            <div className="post" key={post?._id}>
                <h3>{post?.title}</h3>
                <p>{post?.body}</p>
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
