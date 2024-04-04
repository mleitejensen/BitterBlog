import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, password)
    }

    return(
        <>
        <form className="loginForm" onSubmit={handleSubmit}>
            <h2>Sign up to create bitter posts</h2>
            <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/> 
            <br />
            <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />

            {/* error message here */}
            {error && <div className="error">{error}</div>}

            <button disabled={isLoading}>Sign up</button>
        </form>
        </>
    )
}

export default Signup
