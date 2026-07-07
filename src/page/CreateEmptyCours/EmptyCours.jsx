
import './EmptyCours.css'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const EmptyCours = () => {

    const [Name, setName] = useState("")
    const [Img, setImg] = useState("")
    const [author, setAuthor] = useState(null)

    useEffect(() => {
        fetch(`https://the-dashboard-o5h8.onrender.com/user/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(data => setAuthor(data.oneUser.email))
            .catch(err => console.error(err))
    }, [])

    return(
        <div className="Cours-change">


            <div className="titleE">
                <section className="titleE-section">
                    <h2 className="titleH">Créer votre cours :</h2>
                </section>
            </div>


            <div className="content">
                <section className="content-input">
                    <div className="inputName">
                        <label htmlFor="NameCreate">Le nom de votre nouveau cours :</label>
                        <input type="text" className="NameCreate" onChange={(e)=>setName(e.target.value)} />                    
                    </div>

                    <div className="inputImg">
                        <label htmlFor="Img">Le lien de votre image :</label>
                        <input type="text" className="Img" onChange={(e)=>setImg(e.target.value)} />                    
                    </div>
                </section>
            </div>


            <section className="send">
                <button className="sendBtn" onClick={()=>{

                        !Name.trim() || !Img.trim() ? alert("Veuiller renseigner tous les champs")

                        :

                        fetch("http://localhost:3000", {

                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                coursAuthor: author,
                                coursName: `${Name}-${author}`,
                                coursImg: Img,
                                coursDef: [],
                                coursFlash: [],
                                PageContent: []
                            })
                        })
                        .then(()=>{window.location.reload()})

                }}>Créer</button>
            </section>
        </div>
    )
}

export default EmptyCours