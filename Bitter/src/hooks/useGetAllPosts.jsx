import { useState } from "react"
import { json } from "react-router-dom"

export const useGetAllPosts = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [posts, setPosts] = useState(null)

    const getPosts = async () => {
        setError(null)
        setIsLoading(true)

        const response = await fetch('http://localhost:3000/latest');
        let data = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setPosts(data)
            setIsLoading(false)
        }

    }

    return { getPosts, posts, isLoading, error }

}