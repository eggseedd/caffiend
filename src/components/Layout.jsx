import { useState } from "react"
import Modal from "./Modal"
import Authentication from "./Authentication"
import { useAuth } from "../context/AuthContext"

export default function Layout(props) {
    const { children } = props

    const [showModal, setShowModal] = useState(false)

    const { globalUser, logout } = useAuth() 

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND</h1>
                <p>For Coffee Insatiates</p>
            </div>
            {globalUser ? (<button onClick={logout}>
                <p>Logout</p>
            </button>) : (<button onClick={() => setShowModal(true)}>
                <p>Sign up free</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>)}
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend</span> was made by <a target="_blank" href="https://github.com/eggseedd">Raditya Yusuf </a>
            <br />based on <a target="_blank" href="https://smoljames.com">Smoljames&apos;</a> tutorial</p>
        </footer>
    )

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal}/>
                </Modal>)}

            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}