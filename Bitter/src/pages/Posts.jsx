import { useEffect, useState } from "react"
import { useGetAllPosts } from "../hooks/useGetAllPosts"
import { useLogout } from "../hooks/useLogout"

const Posts = () => {
    const { getPosts, posts, isLoading, error } = useGetAllPosts()

    useEffect(() => {
        getPosts()
    }, [])

    return(
        <>
        {posts && posts.map((post) => (
            <div key={post?._id}>
            <div className="post">
                <h3>{post?.title}</h3>
                <p>{post?.body}</p>
            </div>
            </div>
        ))}

        {isLoading && <div className="loading">Loading</div>}

        {error && <div className="error">{error}</div>}
        
        </>
    )
}

export default Posts