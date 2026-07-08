
import { data, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { cours } from '../../data/coursData'
import ListCours from '../../components/ListCours/ListCours'
import CardCreate from '../../components/CardCreate/CardCreate'
import './cours.css'

function Cours(){

    const token = window.localStorage.getItem("token")
    const navigate = useNavigate()
    const [author, setAuthor] = useState("")

    useEffect(() => {
        fetch(`https://the-dashboard-o5h8.onrender.com/user/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.oneUser.email)
                setAuthor(data.oneUser.email)
            })
            .catch(err => console.error(err))
    }, [])

    const myCours = cours.filter(
        obj => obj.coursAuthor === author
    )

    return(

        token ?

            myCours ?

            <div className="Cours">
                <div className="title-cours">
                    <section className='title-cours-section'>
                        <h2 className="Cours-title">Vos cours :</h2>  
                    </section>             
                </div>

                <ul className="Cours-ul">
                    {

                        myCours.map((obj, index)=>(

                            <ListCours key={index} obj={obj} />

                        ))
                    }

                    <CardCreate />

                </ul>
            </div>

            : 
            
            <div className="reloadSite">
                <button className="reloadBtn" onClick={()=>window.location.reload()}>
                    Actualiser
                </button>
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

export default Cours