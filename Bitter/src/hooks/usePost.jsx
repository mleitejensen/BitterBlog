import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useLogout } from "./useLogout"

export const usePost = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [data, setData] = useState(null)
    const {user} = useAuthContext()
    const {logout} = useLogout()
    

    const post = async (title, body, username) => {
        setError(null)
        setIsLoading(true)

        if(!user.token){
            return setError("you must be logged in")
        }

        const response = await fetch("http://10.12.6.51/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({title, body, username})
        })
        const json = await response.json()

        if(!response.ok){
            if(response.status === 401){
                logout()
                alert("User session expired, you have been logged out.")
            }else{
                setError(json.error)
            }
            setIsLoading(false)
        }
        if(response.ok){
            setIsLoading(false)
            setData(json)
        }
    }

    return {post, error, isLoading, data}
}