
import './Redimension.css'
import { useState, useEffect } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import { getCours } from '../../data/coursData'
import ImageSpan from '../../components/imageSpan/imageSpan'

const Redimension = () => {
    
    const {name, indexPage, indexPara} = useParams()
    const [obj, setObj] = useState(null)
    const [dimension, setDimension] = useState(null)
    const naviguate = useNavigate()

    async function getName(name) {
    
        const cours = await getCours();

        return cours.find((nameRef)=>nameRef.coursName===name)

    }
    useEffect(() => {

        async function LoadCours() {

            const logaTest = await getName(name);
            setObj(logaTest)
            setDimension(logaTest.PageContent[indexPage].Paragraph[indexPara].dimension)
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
    
    if(obj===null){
        return <h2>Le serveur est en cours de chargement</h2>
    }

    return(

        <>
        
            <div className="title-box-quest">
                <section className="title-section-quest">
                    <h1 className="quest-title">Redimensionner : </h1>
                </section>
            </div>

            <div className="cours-page">
                <div className="page">

                    <div className="resizes">

                            <input type="range" min='0' max='100' value={dimension} onChange={(e)=>setDimension(e.target.value)}/>

                            <button className='resize' onClick={(e)=>{
                                e.preventDefault()

                                const PageCopy = [...obj.PageContent]

                                PageCopy[indexPage].Paragraph[indexPara] = {
                                    ...PageCopy[indexPage].Paragraph[indexPara],
                                    dimension: Number(dimension)
                                }
                                
                                fetch(`https://the-dashboard-o5h8.onrender.com/add/${obj._id}`, {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        PageContent: PageCopy
                                    })
                                })
                                .then(()=>naviguate(`/cours/Notes/${obj.coursName}`))

                            }}>
                                Redimensionner
                            </button>
                    </div>

                    <ImageSpan obj={obj} descriptObj={obj.PageContent[indexPage].Paragraph[indexPara].img} dimension={dimension} setDimension={setDimension} index={indexPage} indexs={indexPara}/>


                </div>
            </div>


        </>
    )


}

export default Redimension