
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import chargementImg from '../../assets/chargement.png'
import './CreateAccount.css'


const CreateAccount = () => {

    const naviguate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(null)
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {

        if (localStorage.getItem('token')) {
            naviguate('/cours')
        }

        const timer = setTimeout(()=>{setShowLoading(true)}, 300)

        setLoading(true)
        fetch('https://the-dashboard-o5h8.onrender.com/')
            .then(res=> {
                if(!res.ok){
                    console.log('not ok');
                }
                setLoading(false)
                clearTimeout(timer)
                return res.json()
            })
            .catch(err=>{
                setLoading(true)
            })
        return () => clearTimeout(timer);
    }, [])


    if(loading===false){
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

    if(loading===true){

        if (!showLoading) return null;

        return(
            <div className="reloadSite">
                <h2 className="titleReload">Le serveur est en cours de chargement ...</h2>
                <img src={chargementImg} alt="chargement" className={`LoadingImg`} />
            </div>
        )
    }

}

export default CreateAccount