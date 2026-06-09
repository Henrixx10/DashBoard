

import { Link } from 'react-router-dom'
import './HomeConnect.css'
import logo from '../../assets/logo.png'

const HomeConnect = () => {
    

    return(

        <>
        
            <div className="title-div">
                <section className="title-sec">
                    <h2 className='title-h2'>Bienvenue sur <img src={logo} className='img-logo' /> :</h2>
                </section>
            </div>


            <div className="connect">

                <section className="redirect">


                    <Link to={`/connection`}>
                        <button className="connectRedirect">
                            Connection
                        </button>
                    </Link>

                    <Link to={`/createAccount`}>
                        <button className="connectRedirect">
                            Créer votre compte
                        </button>
                    </Link>


                </section>

            </div>

        </>

    )

}

export default HomeConnect