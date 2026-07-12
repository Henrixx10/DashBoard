
import { useParams } from 'react-router-dom'
import { getCours } from '../../data/coursData'
import HeaderCard from '../HeaderCard/HearderCard'
import ContentPage from '../../components/ContentPage/ContentPage'
import { useState, useEffect } from 'react'
import './DetailsNote.css'

const DetailsNote = () => {

    const {name} = useParams()
    const real_name = name.split('-')[1]
    const [reduceSous, setReduce] = useState(false)
    const [content, setContent] = useState(null)
    const [obj, setObj] = useState(null) 
    const [author, setAuthor] = useState("")

    async function getName(name) {
    
        const cours = await getCours();

        return cours.find((nameRef)=>nameRef.coursName===name)
        
    }
    useEffect(() => {

        async function LoadCours() {

            const logaTest = await getName(name);
            console.log(logaTest.coursName.split('-')[0]);
            setObj(logaTest)
            setContent(logaTest.PageContent)
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

    if (obj===null){
        return (<h2>Le serveur est en cours de chargement</h2>)
    }
    

    return (

        obj.PageContent ?


        <>

            <HeaderCard urlname={name} />

            <div className="Title-div-note">
                <section className="title-section-note">
                    <h1 className="notesTitle">Vos notes :</h1>
                </section>
            </div>


            <div className="cours-page">
                <div className="page">

                    <div className="spaces">

                            {

                                reduceSous ? (
                                <>
                                    <button className='reduce' onClick={()=>setReduce(false)}>-</button>
                                                                
                                    
                                    <button className="AddFlash" onClick={()=>{
                                        const SousTitle = prompt("Ajouter votre sous titre")

                                        const objContent = obj.PageContent

                                        objContent.push({
                                            SubTitle: SousTitle,
                                            Paragraph: []
                                        })

                                    // https://the-dashboard-o5h8.onrender.com/add/${data._id}


                                        fetch(`https://the-dashboard-o5h8.onrender.com/add/${obj._id}`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                coursAuthor: real_name,
                                                coursName: obj.coursName,
                                                coursImg: obj.coursImg,
                                                coursDef: obj.coursDef,
                                                coursFlash: obj.coursFlash,
                                                PageContent: objContent,
                                            })
                                        }) 
                                        .then(()=>{window.location.reload()})
                                        .catch((error)=>alert(error))

                                    }}>Ajouter du contenu</button> 

                                    

                                </>

                                ) : 

                                <button className='reduce' onClick={()=>setReduce(true)}>+</button>
                            }
                        
                        </div>

                    {
                        content.map((objContent, index)=>(
                            <ContentPage key={`${index}-key`} content={objContent} obj={obj} index={index} real_name={real_name} indexObj={obj._id} nameObj={obj.coursName}/>
                        ))
                    }

                </div>
            </div>
        </> : 
        fetch(`https://the-dashboard-o5h8.onrender.com/add/${obj._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                PageContent: []
            })
        })
        .then(()=>window.location.reload())


    )

}

export default DetailsNote