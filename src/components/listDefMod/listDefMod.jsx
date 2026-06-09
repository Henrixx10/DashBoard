
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './listDefMod.css'

const ListDefMod = ({def, obj, index, onChange, author}) => {

    const list = obj.coursDef
    const naviguate = useNavigate()


    return(
        <div className="Defs">

            <input type="text" className="lists" value={def} onChange={(e)=>onChange(e.target.value)}/>

            <button className='delete' onClick={()=>{

                list.splice(index, 1)

                fetch(`https://the-dashboard-o5h8.onrender.com/add/${obj._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        coursAuthor: author,
                        coursName: obj.coursName,
                        coursImg: obj.coursImg,
                        coursDef: list,
                        coursFlash: obj.coursFlash
                    })
                })
                .then(()=>{window.location.reload()})

            }}>Supprimer</button>
        </div>
    )
}

export default ListDefMod