import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/auth"
import styles from "./RegistrationPage.module.css"

const RegistrationPage = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const [error, setError] = useState<string[]>([])

    const sendRegistrationForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError([])
        if(password1 !== password2){
            setError(prev => [...prev, "Passwords do not match!"])
        }
        if(password1.length < 8){
            setError(prev => [...prev, "Password must be at least 8 characters long!"])
        }
        if(!username){
            setError(prev => [...prev, "Username is required!"])
        }
        if(!email){
            setError(prev => [...prev, "Email is required!"])
        }
        if(error.length === 0){
            registerUser(username, password1, email)
                .then(response => {
                    navigate("/login");
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

  return (
    <div className={styles.pageWrapper}>
        <h1 className={styles.pageTitle}>Registration</h1>
        <form className={styles.registerForm} onSubmit={sendRegistrationForm}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password1">Password</label>
            <input type="password" id="password1" value={password1} onChange={(e) => setPassword1(e.target.value)}/>

            <label htmlFor="password2">Confirm Password</label>
            <input type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}/>

            <input className={styles.submitButton} type="submit" value="Register"/>

            <Link to="/login" className={styles.loginLink}>
                Log in
            </Link>

            {error.map((e, index) => <p key={`${e}-${index}`} className={styles.errorMessage}>{e}</p>)}
        </form>
    </div>
  )
}

export default RegistrationPage