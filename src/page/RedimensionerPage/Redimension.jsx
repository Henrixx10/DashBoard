
import './Redimension.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getByName } from '../../data/coursData'
import ImageSpan from '../../components/imageSpan/imageSpan'

const Redimension = () => {
    
    const {name, indexPage, indexPara} = useParams()
    const obj = getByName(name)
    const [dimension, setDimension] = useState(obj.PageContent[indexPage].Paragraph[indexPara].dimension)
    console.log(dimension);
    const naviguate = useNavigate()

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