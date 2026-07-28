
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ListCours from '../../components/ListCours/ListCours'
import CardCreate from '../../components/CardCreate/CardCreate'
import chargementImg from '../../assets/reload.png'
import FullSizeComponents from '../../components/FullSizeComponents/FullSizeComponents'
import lists from '../../assets/list.png'
import block from '../../assets/basique.png'
import './cours.css'

function Cours(){

    const token = window.localStorage.getItem("token")
    const navigate = useNavigate()
    const [cours, setCours] = useState([])
    const [author, setAuthor] = useState("")
    const [loading, setLoading] = useState(true)
    const [showLoading, setShowLoading] = useState(false)
    const [dimensionPage, setDimensionPage] = useState(null)

    function fetchTimeout(url, time = 30000) {
        return Promise.race([
            fetch(url),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), time)
            )
        ]);
    }


    useEffect(() => {
        
        const timer = setTimeout(()=>{setShowLoading(true)}, 300)

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
            console.log("Finnaly");
            clearTimeout(timer);
            setLoading(false);
        });
        return () => clearTimeout(timer);
    }, []);

    useEffect(()=>{
        setDimensionPage(window.innerWidth)
    }, [window.innerWidth])


    const myCours = cours.filter(
        obj => obj.coursAuthor === author
    )

    return(

        token ?

            loading && showLoading?
            
            <div className="reloadSite">
                <h2 className="titleReload">Le serveur est en cours de chargement ...</h2>
                <img src={chargementImg} alt="chargement" className={`LoadingImg`} />
            </div>

            :

            dimensionPage < 650 ?
            
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
            <div className="Cours">

                <div className="aff" style={{
                    position: 'fixed',
                    left: window.innerWidth-170,
                    top: '99px'
                }}>
                    {/* <button className='btn_aff' onClick={()=>setList(true)}>
                        <img src={lists} alt="affichage liste" className='image_set'/>
                    </button> */}
                    {/* <button className='btn_aff' onClick={()=>setList(true)}>
                        <img src={block} alt="affichage block" className='image_set'/>
                    </button> */}
                </div>

                <div className="title-cours">
                    <section className='title-cours-section'>
                        <h2 className="Cours-title">Vos cours :</h2>
                    </section>
                </div>

                <ul className="Cours-ul">
                    {

                        myCours.map((obj, index)=>(

                            <FullSizeComponents key={index} obj={obj} />

                        ))
                    }

                    {/* <CardCreate /> */}

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
                    <Link>
                        <button className="hub" onClick={()=>navigate('/start')} >Créer un compte ou connecter vous</button>
                    </Link>
                </ul>

            </div>
    )

}

export default Cours