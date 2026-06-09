
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateAccount.css'


const CreateAccount = () => {

    const naviguate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (


        <div className="content-all-account">


            <div className="back">
                <button className="Retour" onClick={()=>naviguate('/start')}>
                    Retour
                </button>
            </div>

            <div className="title-box-account">
                <section className="title-section-account">
                    <h2 className="title-account">Créer votre compte :</h2>
                </section>
            </div>


            <div className="inputAccount">

                <section className="inputA">

                    <label htmlFor="email">Votre email :</label>
                    <input type="text" className="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="pass">Votre mot de passe :</label>
                    <input type="password" className="pass" onChange={(e)=>setPassword(e.target.value)}/>

                    <button className="sendAccount" onClick={()=>{

                        !email && !password ? alert("Veuiller remplir les champs")
                        
                        :

                        fetch('https://the-dashboard-o5h8.onrender.com/user', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email : email,
                                password: password
                            })
                        })

                        .then(()=>window.location.reload())
                        
                        // window.location.reload()
                    }}>
                        Créer votre compte
                    </button>

                </section>
            </div>
        </div>
    )

}

export default CreateAccount