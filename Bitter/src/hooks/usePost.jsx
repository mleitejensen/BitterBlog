import { useState } from "react"

export const usePost = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [data, setData] = useState(null)

    const post = async (title, body, username) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch("http://10.12.6.51/post", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, body, username})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setIsLoading(false)
            setData(json)
        }
    }

    return {post, error, isLoading, data}
}