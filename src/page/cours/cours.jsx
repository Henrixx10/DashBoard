
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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://the-dashboard-o5h8.onrender.com/user/${localStorage.getItem('userId')}`)
            .then(res => {
                if(res){
                    return res.json()
                }
                else{
                    setLoading(true)
                }
            })
            .then(data => {
                console.log(data.oneUser.email)
                setAuthor(data.oneUser.email)
            })
            .catch(() => setLoading(true))
            .finally(()=>setLoading(false))
    }, [])

    const myCours = cours.filter(
        obj => obj.coursAuthor === author
    )

    return(

        token ?

            cours.length > 0 ?

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