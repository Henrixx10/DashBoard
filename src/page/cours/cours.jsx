
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ListCours from '../../components/ListCours/ListCours'
import CardCreate from '../../components/CardCreate/CardCreate'
import './cours.css'

function Cours(){

    const token = window.localStorage.getItem("token")
    const navigate = useNavigate()
    const [cours, setCours] = useState([])
    const [author, setAuthor] = useState("")
    const [loading, setLoading] = useState(true)

    function fetchTimeout(url, time = 30000) {
        return Promise.race([
            fetch(url),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), time)
            )
        ]);
    }

    useEffect(() => {
        Promise.all([
            fetchTimeout("https://the-dashboard-o5h8.onrender.com/").then(res => {
                if (!res.ok) throw new Error("Erreur serveur")
                return res.json()
            }),
            fetchTimeout(`https://the-dashboard-o5h8.onrender.com/user/${localStorage.getItem("userId")}`).then(res => {
                if (!res.ok) throw new Error("Erreur serveur")
                return res.json()
            })
        ])
        .then(([coursData, userData]) => {
            setCours(coursData.synths);
            setAuthor(userData.oneUser.email);
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const myCours = cours.filter(
        obj => obj.coursAuthor === author
    )

    return(

        token ?

            loading ?

            <div className="reloadSite">
                <h2 className="titleReload">Le serveur est en cours de chargement ...</h2>
                {/* <button className="reloadBtn" onClick={()=>window.location.reload()}>
                    Actualiser
                </button> */}
            </div>

            : 

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