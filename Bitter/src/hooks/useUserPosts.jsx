import { useState } from "react"

export const useUserPosts = () => {
    const [userPostError, setUserPostError] = useState(null)
    const [userPostIsLoading, setUserPostIsLoading] = useState(null)
    const [userPostData, setUserPostData] = useState(null)

    const getUserPosts = async (user) => {
        setUserPostError(null)
        setUserPostIsLoading(true)

        const response = await fetch(`http://10.12.6.51/user/${user}`)
        const json = await response.json()

        if(!response.ok){
            setUserPostIsLoading(false)
            setUserPostError(json.error)
        }
        if(response.ok){
            setUserPostIsLoading(false)
            setUserPostData(json)
        }
    }

    return {getUserPosts, userPostError, userPostIsLoading, userPostData}
}