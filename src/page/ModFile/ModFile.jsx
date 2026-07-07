
import './ModFile.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getByName } from '../../data/coursData'


const ModFile = () => {

    const naviguate = useNavigate()
    const [file, setFile] = useState(null)
    const {indexObj, indexPara, indexTxt, coursName, ImgId} = useParams()
    return (
        <>

            <div className="Title-div-note">
                <section className="title-section-note">
                    <h1 className="notesTitle">Modifier votre image :</h1>
                </section>
            </div>

            <div className="Title-div-fichier">
                <section className="title-section-fichier">
                    <label htmlFor="sendFileInput" style={{margin:'5px', fontSize:'1.2em'}}>Entrer votre fichier</label>
                    <input type="file" className='sendFileInput' onChange={(e)=>{setFile(e.target.files[0])}}/>
                    <button className='SendFIle' onClick={()=>{

                    const tab = ["gallery", ImgId]
                    const id = tab.join('/')


                    fetch(`https://the-dashboard-o5h8.onrender.com/images/delete/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            imgId: id
                        })
                    })

                    const formData = new FormData()
                    formData.append('imageSynth', file)
                    formData.append('indexPara', indexPara)
                    formData.append('indexTxt', indexTxt)

                    fetch(`https://the-dashboard-o5h8.onrender.com/images/${indexObj}`, {
                        method: "PUT",
                        body: formData
                    })

                    .then(()=>{
                        window.location.href=`/cours/Notes/${coursName}`
                    })

                    }}>Envoyer</button>
                </section>
            </div>

        </>
    )

}

export default ModFile