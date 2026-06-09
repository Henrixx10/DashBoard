
import { useNavigate } from 'react-router-dom'
import './info.css'
import logo from '../../assets/logo.png'

const Info = () => {

    const token = window.localStorage.getItem('token')
    const navigate = useNavigate()

    return(

        token ?

        <div className="info-box">
            <section className="title-section">
                <span className="titleBorder">
                    <h2 className="title">Nos infos</h2>                    
                </span>
            </section>

            <section className="info-section">
                <span className="infoBorder">
                    <p>Bienvenue sur <strong>The DashBoard</strong>, un site communautaire qui vous permet de créer vos synthèses en ligne.</p>
                    <p>Si vous avez des problèmes avec vos images sur un portable, vous pouvez utiliser un <a href="https://base64.guru/converter/encode/image" className='lien' target='_blanck'>convertisseur</a>.</p>
                    <p>Si vous contractez des problemes veuillez nous contacter à l'addresse suivante : <strong>thedashboard@gmail.com</strong></p>         
                    <button className="deco" onClick={()=>{
                        window.localStorage.removeItem("token")
                        window.localStorage.removeItem("userId")
                        window.location.reload()
                    }} >Deconnecter vous</button>
                    <img src={logo} className="img" />
                </span>
            </section>

        </div>

        : 

            <div className="Lolo">
                <div className="Cours">
                    <div className="title-cours">
                        <section className='title-cours-section'>
                            <h2 className="Cours-title">Connecter vous ou créer un compte :</h2>  
                        </section>             
                    </div>
                </div>        


                <ul className="Cours-ul">
                    <button className="hub" onClick={()=>navigate('/start')} >Créer un compte ou connecter vous</button>
                </ul>

            </div>
    )

}

export default Info