import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authentication(props) {
    const { handleCloseModal } = props

    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')    
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    const { signup, login } = useAuth()

    async function handleAuthentication() {
        if (!email || !email.includes('@') || !password || password.length < 6) {
            alert('Please fill out all fields')
            return
        }

        try {
            setIsAuthenticating(true)
            setErrMessage('')

            if (isRegistration) {
                await signup(email, password)
            }
            else {
                await login(email, password)
            }
            handleCloseModal()
        } catch (err) {
            console.log(err.message)
            setErrMessage(err.message)
        } finally {
            setIsAuthenticating(false)          
        }
    }

    return (
        <>
            <h2 className="sign-up-text">{isRegistration ? 'Sign up' : 'Log in'}</h2>
            <p>{ isRegistration ? 'Create an account!' : 'Sign in to your account!' }</p>
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" />
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="********" />
            <button onClick={handleAuthentication}>{isAuthenticating ? 'Authenticating...' : isRegistration ? 'Sign up' : 'Log in'}</button>
            {errMessage && <p style={{color: 'red'}}>{errMessage}</p>}
            <hr />
            <div className="register-content">
                <p>{ isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => {
                    setIsRegistration(!isRegistration)
                    setErrMessage('')}}>{isRegistration ? 'Sign in' : 'Sign up'}</button>
            </div>
        </>
    )
}