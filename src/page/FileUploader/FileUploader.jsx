
import { forwardRef, useState } from 'react'
import './FileUploader.css'
import { useNavigate, useParams } from 'react-router-dom'


const FileUploader = () => {

    const naviguate = useNavigate()
    const [file, setFile] = useState(null)
    const {indexObj, indexPara, indexTxt, nameObj} = useParams()

    return (
        <>

            <div className="Title-div-note">
                <section className="title-section-note">
                    <h1 className="notesTitle">Ajouter votre image :</h1>
                </section>
            </div>

            <div className="Title-div-fichier">
                <section className="title-section-fichier">
                    <label htmlFor="sendFileInput" style={{margin:'5px', fontSize:'1.2em'}}>Entrer votre fichier</label>
                    <input type="file" className='sendFileInput' onChange={(e)=>{setFile(e.target.files[0])}}/>
                    <button className='SendFIle' onClick={()=>{

                        const formData = new FormData()
                        formData.append('imageSynth', file)
                        formData.append('indexPara', indexPara)
                        formData.append('indexTxt', indexTxt)

                        // https://the-dashboard-o5h8.onrender.com
                        fetch(`https://the-dashboard-o5h8.onrender.com/images/${indexObj}`, {
                            method: "PUT",
                            body: formData
                        }) 
                        .then(()=>window.location.href=`/cours/Notes/${nameObj}`)
                    }}>Envoyer</button>
                </section>
            </div>

        </>
    )

}

export default FileUploader