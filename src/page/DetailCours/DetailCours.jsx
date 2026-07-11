
import { useState, useEffect } from 'react'
import { getByName } from '../../data/coursData'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ListDef from '../../components/listDef/listDef'
import Card from '../../components/Card/Card'
import HeaderCard from '../HeaderCard/HearderCard'
import './DetailCours.css'


const DetailCours = () => {

    const {name} = useParams()
    const [reduce, setReduce] = useState(false)
    const [data, setData] =  useState(null)
    const [author, setAuthor] = useState("")

    useEffect(() => {

        async function LoadCours() {

            const data = await getByName(name);

            setData(data);
        }

        LoadCours();
    }, []);

    const nameCours = data.coursName.split('-')[0]
    const nameDirect = data.coursName.split('-')[1]


    const naviguate = useNavigate()

    return(

        <>

            <HeaderCard urlname={name} />

            <div className="title-box">
                <div className="content-title">
                    <h1 className="title">{nameCours}</h1>
                    <img className="img-box" src={data.coursImg} />
                </div>
            </div>

            <div className="definition">
                <div className="listDef">

                    <div className="btnAddCard">

                        <div className="space">

                            {

                                reduce ? (
                                <>
                                    <button className='reduce' onClick={()=>setReduce(false)}>-</button>
                                                                
                                    <button className="AddCard" onClick={()=>{
                                        const Newdef = prompt("Ajouter votre nouvelle def")

                                        const list = data.coursDef

                                        list.push(Newdef)

                                        fetch(`https://the-dashboard-o5h8.onrender.com/add/${data._id}`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                coursAuthor: nameDirect,
                                                coursName: data.coursName,
                                                coursImg: data.coursImg,
                                                coursDef: list,
                                                coursFlash: data.coursFlash,
                                            }
                                        )
                                        })
                                        .then(()=>{window.location.reload()})
                                        // window.location.reload()

                                    }}>Ajouter une def</button>
                                    
                                    <button className="AddFlash" onClick={()=>{
                                        const NewCardQ = prompt("Ajouter votre question")
                                        const NewCardR = prompt("Ajouter votre réponse")

                                        const listF = data.coursFlash

                                        listF.push({quest: NewCardQ, rep: NewCardR})


                                        fetch(`https://the-dashboard-o5h8.onrender.com/add/${data._id}`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                coursAuthor: nameDirect,
                                                coursName: data.coursName,
                                                coursImg: data.coursImg,
                                                coursDef: data.coursDef,
                                                coursFlash: listF,
                                            })
                                        }) 
                                        .then(()=>{window.location.reload()})

                                    }}>Ajouter une FlashCard</button> 

                                    

                                </>

                                ) : 

                                <button className='reduce' onClick={()=>setReduce(true)}>+</button>
                            }
                        
                        </div>
   

                    </div>

                    {
                        data.coursDef.map((definition, index)=>(
                            <ul className="listDefs">
                                <ListDef def={definition}/>
                            </ul>
                        ))
                    }
                </div>
            </div>

            <div className="flash">
                <div className="flashCard">
                    {
                        data.coursFlash.map((flash, index)=>(
                            <span key={index} className="Cards">
                                <Card className='card' quest={flash.quest} rep={flash.rep} />
                            </span>
                        ))
                    }
                </div>
            </div>
        

        </>
    )

}

export default DetailCours