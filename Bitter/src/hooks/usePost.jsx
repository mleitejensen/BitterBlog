import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const usePost = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [data, setData] = useState(null)
    const {user} = useAuthContext()
    

    const post = async (title, body, username) => {
        setError(null)
        setIsLoading(true)

        if(!user.token){
            return setError("you must be logged in")
        }

        const response = await fetch("http://localhost:3000/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
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