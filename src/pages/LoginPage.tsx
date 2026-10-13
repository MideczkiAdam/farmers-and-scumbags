import { useState } from "react"
import { loginUser } from "../services/auth"
import styles from "./LoginPage.module.css"

const LoginPage = () => {
    const [error, setError] = useState<string[]>([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const sendLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError([])
        if(!username){
            setError(prev => [...prev, "Username is required!"])
        }
        if(!password){
            setError(prev => [...prev, "Password is required!"])
        }
        if(error.length === 0){
            loginUser(username, password)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.formCard}>
                <h1 className={styles.title}>Login</h1>
                <p className={styles.subtitle}>Welcome back to the village.</p>

                <form className={styles.loginForm} onSubmit={sendLoginForm}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className={styles.submitButton} type="submit">
                        Log in
                    </button>

                    {error.map((e, index) => (
                        <p key={`${e}-${index}`} className={styles.errorMessage}>
                            {e}
                        </p>
                    ))}
                </form>
            </div>
        </div>
    )
}

export default LoginPage;