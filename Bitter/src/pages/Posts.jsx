import { useEffect, useState } from "react"

const Posts = () => {
    const [posts, setPosts] = useState(null)

    const makeApiCall = async () => {
        try {
            const response = await fetch('http://localhost:3000/latest');
            let data = await response.json();
            setPosts(data)
          }
          catch (error) {
            console.log(error)
          }
    }
    useEffect(() => {
        makeApiCall()


    }, [])

    useEffect(() => {
        console.log(posts)
    }, [posts])



    return(
        <>
        {posts && posts.map((post) => (
            <>
            {post &&
                <div className="post" key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            }
            </>
        ))}
        
        </>
    )
}

export default Posts