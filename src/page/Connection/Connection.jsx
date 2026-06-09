
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Connection.css'


const Connection = () => {

    const naviguate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (localStorage.getItem('token')) {
            naviguate('/cours')
        }
    }, [])

    return (


        <div className="content-all-account">


            <div className="back">
                <button className="Retour" onClick={()=>naviguate('/start')}>
                    Retour
                </button>
            </div>


            <div className="title-box-account">
                <section className="title-section-account">
                    <h2 className="title-account">Connecter vous :</h2>
                </section>
            </div>


            <div className="inputAccount">
                <section className="inputA">

                    <label htmlFor="email">Votre email :</label>
                    <input type="text" className="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="pass">Votre mot de passe :</label>
                    <input type="password" className="pass" onChange={(e)=>setPassword(e.target.value)}/>

                    <button className="sendAccount" onClick={()=>{

                        let Email = email.trim()
                        let Password = password.trim()

                        !Email || !Password ? alert("Veuiller remplir les champs")
                        
                        :

                        fetch('https://the-dashboard-o5h8.onrender.com/user/connection', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email : Email,
                                password: Password
                            })
                        })
                        .then(async response => {

                            const data = await response.json()

                            if(!response.ok){
                                alert(data.message || "erreur de connection")
                                return
                            } 

                            localStorage.setItem('token', data.token)
                            localStorage.setItem('userId', data.userId)

                            window.location.reload()
                            
                        })
                        .catch(error => alert(error.message))
                    }}>
                        Connection
                    </button>

                </section>
            </div>
        </div>
    )

}

export default Connection