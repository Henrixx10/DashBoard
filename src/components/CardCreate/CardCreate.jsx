
import { useNavigate } from 'react-router-dom'
import '../Card/Card.css'


const CardCreate = () => {

    const naviguate = useNavigate()

    return(
        <div className="card-boxS" onClick={()=>naviguate("/emptyCours")}>
            <h3 className="Name">+</h3>
        </div>        
    )
}

export default CardCreate