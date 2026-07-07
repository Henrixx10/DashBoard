
import { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageSpan from '../imageSpan/imageSpan'
import './ContentPage.css'

const ContentPage = ({content, obj, index, real_name, indexObj, nameObj}) => {

    const naviguate = useNavigate()

    const [menu, setMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        indexPara: null
    })

    const [menu2, setMenu2] = useState({
        visible: false,
        x: 0,
        y: 0,
        indexPara: null
    })
    
    const [menu3, setMenu3] = useState({
        visible: false,
        x: 0,
        y: 0,
        indexPara: null
    })
    
    window.addEventListener('click', ()=>{
        setMenu({visible: false})
        setMenu2({visible: false})
    })

    const [dimension, setDimension] = useState([])

    const [reducePara, setReduce] = useState(false)

    return(

        <>
        <section className="parag">
            <h3 className='para'>{content.SubTitle} :</h3>
                    <div className="spaces">
                            {

                                reducePara ? (
                                <>
                                    <button className='reduce' onClick={()=>setReduce(false)}>-</button>

                                    <button className="AddFlash" onClick={()=>{

                                        const paragraphBox = prompt("Ajouter votre paragraphe")

                                        // const copyPara = obj.PageContent[index].Paragraph

                                        // copyPara.push({
                                        //     txt: paragraphBox
                                        // })

                                        // const pageContentSend = {
                                        //     ...obj.PageContent[index],
                                        //     Paragraph: copyPara
                                        // }
                                        const pageContentSend = [...obj.PageContent];

                                        pageContentSend[index] = {
                                            ...pageContentSend[index],
                                            Paragraph: [
                                                ...pageContentSend[index].Paragraph,
                                                {
                                                    txt: paragraphBox
                                                }
                                            ]
                                        }
                                        
                                        console.log(pageContentSend)

                                        
                                    // https://the-dashboard-o5h8.onrender.com/add/${data._id}


                                        fetch(`https://the-dashboard-o5h8.onrender.com/add/${obj._id}`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                PageContent: pageContentSend
                                            })
                                        })

                                        .then(()=>{window.location.reload()})

                                    }}>Ajouter un paragraphe</button> 

                                    <button className="Supres" onClick={()=>{

                                        const objContent = [...obj.PageContent]

                                        objContent.splice(index, 1)

                                        console.log(objContent)


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

                                    }}>Supprimer</button>


                                </>

                                ) : 

                                <button className='reduce' onClick={()=>setReduce(true)}>✏️</button>
                            }
                        
                    </div>
        </section>
            
            {
                content.Paragraph.map((descriptObj, indexs)=>(
                  <>

                        <div className='para' key={`${indexs}-para`} onDoubleClick={(e)=>{
                                    e.preventDefault()
                                    setMenu2({visible:true, x: e.clientX, y: e.clientY, indexPara: indexs})
                                }} onContextMenu={(e)=>{

                            e.preventDefault()

                            setMenu({visible:true, x: e.clientX, y: e.clientY, indexPara: indexs})

                        }}>{descriptObj.txt}</div>

                        {menu.visible&& <div style={{
                                                    display: 'flex',
                                                    position: 'fixed',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    top: menu.y,
                                                    left: menu.x,
                                                    backgroundColor: 'white',
                                                    borderRadius: '10px',
                                                    border: '1px solid #e8e5e5ff',
                                                    // boxShadow: '0.5px 0.5px 1px 1px #e8e5e5ff'
                                                    boxShadow: ' 0 2px 8px rgba(0, 0, 0, 0.2)'
                                                }}>

                                                    <button className="ajouter" onClick={()=>{

                                                        naviguate(`/cours/FileUpload/${indexObj}/${index}/${menu.indexPara}/${nameObj}/`)

                                                    }}>
                                                        Ajouter une image
                                                    </button>

                                                    <button className="del" onClick={()=>{

                                                        const pageContentSendSup = [...obj.PageContent]

                                                        const copyParagraph = [...obj.PageContent[index].Paragraph]

                                                        copyParagraph.splice(menu.indexPara, 1)
                                                                                    
                                                        pageContentSendSup[index] = {
                                                            ...pageContentSendSup[index],
                                                            Paragraph: copyParagraph
                                                        }

                                                        fetch(`https://the-dashboard-o5h8.onrender.com/add/${obj._id}`, {
                                                            method: "PUT",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({
                                                                PageContent: pageContentSendSup
                                                            })
                                                        })
                                                        .then(()=>{window.location.reload()})
                                                    }}>
                                                        Supprimer
                                                    </button>

                        </div>}

                        {
                            descriptObj.img ?
                            <div className='imagediv'>
                                <img style={{
                                    margin: '20px',
                                    width: `${obj.PageContent[index].Paragraph[indexs].dimension}%`
                                    
                                }}src={descriptObj.img} onDoubleClick={(e)=>{
                                    e.preventDefault()
                                    setMenu2({visible:true, x: e.clientX, y: e.clientY, indexPara: indexs})
                                }} onContextMenu={(e)=>{
                                    e.preventDefault()
                                    setMenu2({visible:true, x: e.clientX, y: e.clientY, indexPara: indexs})
                                }} />
                            </div> : console.log("")
                        }
                        {menu2.visible&& <div style={{
                                                    display: 'flex',
                                                    position: 'fixed',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    top: menu2.y,
                                                    left: menu2.x,
                                                    backgroundColor: 'white',
                                                    borderRadius: '10px',
                                                    border: '1px solid #e8e5e5ff',
                                                    boxShadow: ' 0 2px 8px rgba(0, 0, 0, 0.2)'
                                                }}>

                                                    <button className='ajouter' onClick={()=>{
                                                        setMenu2({visible: false})

                                                        naviguate(`/cours/Redimension/${obj.coursName}/${index}/${menu2.indexPara}`)

                                                    }}>
                                                        Redimensionner
                                                    </button>

                                                    <button className='ajouter' onClick={()=>{
                                                        setMenu2({visible: false})
                                                        const ImgId = obj.PageContent[index].Paragraph[menu2.indexPara].img
                                                        const id_cut = ImgId.split('/gallery/')[1]
                                                        const id = id_cut.split('.')[0]

                                                        naviguate(`/cours/FileUploadMod/${indexObj}/${index}/${menu2.indexPara}/${obj.coursName}/${id}`)


                                                    }}>
                                                        Modifier
                                                    </button>

                                                    <button className='del' onClick={()=>{

                                                        const ImgId = obj.PageContent[index].Paragraph[menu2.indexPara].img
                                                        const id_cut = ImgId.split('/gallery/')[1]
                                                        const id = id_cut.split('.')[0]

                                                        fetch(`https://the-dashboard-o5h8.onrender.com/images/delete/`, {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({
                                                                imgId: id
                                                            })
                                                        })

                                                        const objSend = [...obj.PageContent]

                                                        const paraCopy = [...obj.PageContent[index].Paragraph]

                                                        delete paraCopy[menu2.indexPara].img
                                                        delete paraCopy[menu2.indexPara].ImgId

                                                        objSend[index] = {
                                                            ...objSend[index],
                                                            Paragraph: paraCopy
                                                        }

                                                        fetch(`https://the-dashboard-o5h8.onrender.com/add/${obj._id}`, {
                                                            method: "PUT",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({
                                                                PageContent: objSend
                                                            })
                                                        })

                                                        
                                                    }}>
                                                        Supprimer
                                                    
                                                    </button>

                        </div>}
                  </>
                ))
            }

        </>
    )

}

export default ContentPage
