
import { useEffect, useState } from 'react'
import { getCours } from '../../data/coursData'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ListDefMod from '../../components/listDefMod/listDefMod'
import CardMod from '../../components/CardMod/CardMod'
import HeaderCard from '../HeaderCard/HearderCard'
import './ModifyCours.css'

const ModifyCours = () => {

    const {name} = useParams()
    const [data, setData] = useState(null)
    const [nameCrs, setNameCrs] = useState(null)
    const [defs, setDefs] = useState([])
    const [falshs, listChange] = useState([])
    const [author, setAuthor] = useState("")
    const naviguate = useNavigate()

    async function getName(name) {
    
        const cours = await getCours();

        return cours.find((nameRef)=>nameRef.coursName===name)
        
    }
    useEffect(() => {

        async function LoadCours() {

            const logaTest = await getName(name);
            setData(logaTest)
            setNameCrs(logaTest.coursName.split('-')[0])
            
            listChange(logaTest.coursFlash)
            setDefs(logaTest.coursDef)
        }

        LoadCours();
    }, []);

    useEffect(() => {
        fetch(`https://the-dashboard-o5h8.onrender.com/user/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(data => {
                setAuthor(data.oneUser.email)
            })
            .catch(err => console.error(err))
    }, [])
    

    if (!data) {
        return <h2>Chargement...</h2>;
    }

    return(

        <>

            <HeaderCard urlname={name}/>

            <div className="title-box">
                <div className="content-title">
                    <h1 className="title">Modifier votre cours de {nameCrs.nameCours}</h1>
                    <img className="img-box" src={data.coursImg} />
                </div>
            </div>

            <div className="definition">
                <div className="listDef">
                    {

                        defs.map((definition, index)=>(

                            
                            <ul key={index} className="listDefs">
                                <ListDefMod def={definition} obj={data} index={index} onChange={(newValue)=>{
                                    const copy = [...defs]
                                    copy[index] = newValue
                                    setDefs(copy)
                                }} author={author} />
                            </ul>
                        ))
                    }                
                </div>
            </div>

            <div className="flash">
                <div className="flashCard">
                    {
                        falshs.map((flash, index)=>(
                            <span key={index} className="Cards">
                                <CardMod className='card' quest={flash.quest} rep={flash.rep} obj={data} index={index} listChange={(field, value)=>{
                                    const copy = [...falshs]

                                    copy[index] = {
                                        ...copy[index], 
                                        [field] :value
                                    }

                                    listChange(copy)
                                }} author={author} />
                            </span>
                        ))
                    }
                </div>
            </div>


            <div className="button-box">
                    <button className="saveReq" onClick={()=>{
                        const flashCardNewList = [...falshs]
                        const req = {
                            coursAuthor: author,
                            coursName: data.coursName,
                            coursImg: data.coursImg,
                            coursDef: defs,
                            coursFlash: flashCardNewList
                        }
                        

                        fetch(`https://the-dashboard-o5h8.onrender.com/add/${data._id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(req)
                        })

                        .then(()=>{window.location.reload()})


                    }}>Sauvegarder</button>
            </div>

            <div className="retour">
                <button className="supress" onClick={()=>{

                    if(confirm("Etes vous sûr")){
                        fetch(`https://the-dashboard-o5h8.onrender.com/supress/${data._id}`)
                        .then(()=>{
                            window.location.reload()
                        })
                        naviguate('/cours')                        
                    }
                }}>Supprimer</button>
            </div>
        

        </>
    )

}

export default ModifyCours