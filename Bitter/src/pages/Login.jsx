import { useEffect, useState } from "react"


const Login = () => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    useEffect(() => {
        console.log(username)
    }, [username])
    useEffect(() => {
        console.log(password)
    }, [password])

    return(
        <>
        <form className="loginForm">
        <h2>Sign in to create bitter posts</h2>
            <input type="text" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/> 
            <br />
            <input type="text" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            {/* error message here */}
            <br />
            <button>Sign in</button>
        </form>
        </>
    )
}

export default Login
