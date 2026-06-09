
import './Card.css'
import { useState } from 'react'

const Card = ({quest, rep}) => {

    const [retour, setRetour] = useState(false)
    const [texte, setTexte] = useState(quest)

    const returnCard = () => {
        if(texte===quest){
            setTexte(rep)
            setRetour(true)
        } else {
            setTexte(quest)
            setRetour(false)
        }
    }

    return(
        <>
        <button className={retour? "flashActive" : "flashReturn"} onClick={returnCard} >
            {texte} {texte===quest? "?": ""}
        </button>
        </>
    )

}

export default Card