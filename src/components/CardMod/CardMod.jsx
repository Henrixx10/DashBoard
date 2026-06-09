
import './CardMod.css'

const CardMod = ({quest, rep, obj, index,listChange, author}) => {
    
    const list = obj.coursFlash

    return(
        <div className="CardMod">

            <input type="text" className="quest" value={quest} onChange={(e)=> listChange("quest", e.target.value)}/>

            <input type="text" className="reponse" value={rep} onChange={(e)=> listChange("rep", e.target.value)}/>

            <button className='deleteC' onClick={()=>{

                list.splice(index, 1)

                fetch(`https://the-dashboard-o5h8.onrender.com/add/${obj._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        coursAuthor: author,
                        coursName: obj.coursName,
                        coursImg: obj.coursImg,
                        coursDef: obj.coursDef,
                        coursFlash: list
                    })
                })
                .then(()=>window.location.reload())

            }}>Supprimer</button>
        </div>
    )


}

export default CardMod