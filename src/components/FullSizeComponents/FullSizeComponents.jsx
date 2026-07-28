import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FullSizeComponents.css'
import pin_img from '../../assets/pin.png'

const FullSizeComponents = ({obj}) => {

    const nameCours = obj.coursName.split('-')[0]
    const [reduce_grand, setReduce_grand] = useState(false)
    const select_obj = obj.coursToDo.filter((to_do)=>to_do.tag==='important').length
    const select_obj_terminer = obj.coursToDo.filter((to_do)=>to_do.tag==='terminer').length
    const select_all = obj.coursToDo.length

    const pourcent_virgule = (select_obj_terminer / select_all) * 100
    const pourcent = Math.round(pourcent_virgule)
    

    
    return(
            <div className="card-boxs">
                <div className="imagebox-title">
                    <h3 className="Names">{nameCours}</h3>
                    <img src={obj.coursImg} alt='logo' className='img-courss'/>
                </div>
                
                    <div className="spawn_to_do">

                            <h4>Tâches urgentes ({select_obj}) :</h4>

                        {
                            select_obj<=3?
                                obj.coursToDo.map((todo, index)=>(
                                    todo.tag === "important" ?
                                        <>
                                        
                                            <p key={`${index}-name`} className='todo_spawn'>
                                                📌 {todo.to_do}
                                            </p>
                                        </>
                                    : null
                                ))
                            : <p className='todo_spawn'>Veuiller supprimer une tâche !</p>
                        }
                    </div>
                    <Link to={`/cours/${obj.coursName}`} className='links'>
                        <div className="acces">
                            <p className="acces-p">
                                Ouvrir
                            </p>
                        </div>                    
                    </Link>

            </div>
    )
}

export default FullSizeComponents