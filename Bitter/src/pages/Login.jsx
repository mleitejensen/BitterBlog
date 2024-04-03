import { useState } from "react"


const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(username, password)
    }

    return(
        <>
        <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Sign in to create bitter posts</h2>
            <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/> 
            <br />
            <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {/* error message here */}
            <br />
            <button>Sign in</button>
        </form>
        </>
    )
}

export default Login
