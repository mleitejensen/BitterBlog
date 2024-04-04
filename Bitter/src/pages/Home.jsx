import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Home = () => {
    const { user } = useParams();
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)

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


    return(
        <>
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
