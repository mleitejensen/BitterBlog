import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost"

const Home = () => {
    const { user } = useParams();
    const [posts, setPosts] = useState(null)
    //const [error, setError] = useState(null)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const {post, error, isLoading, data} = usePost()

    const makeApiCall = async () => {
        const response = await fetch(`http://localhost:3000/user/${user}`)
        const json = await response.json()

        if(response.ok){
            setPosts(json)
        }
        if(!response.ok){
            setError(json.error)
        }
    }

    useEffect(() => {
        makeApiCall()
    }, [user])

    useEffect(() => {
        makeApiCall()
    },[data])

    const publish = async (e) => {
        e.preventDefault()

        await post(title, body, user)
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

        {posts && posts.map((post) => (
            <div className="post" key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>

        ))}

        {error && (
            <div className="error">{error}</div>
        )}
        </>
    )
}

export default Home
