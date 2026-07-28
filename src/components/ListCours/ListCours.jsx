import { Link } from 'react-router-dom'
import './ListCours.css'

const ListCours = ({obj}) => {

    const nameCours = obj.coursName.split('-')[0]

    return(
        <Link to={`/cours/${obj.coursName}`} className='link'>
            <div className="card-box">
                <h3 className="Name">{nameCours}</h3>
                <img src={obj.coursImg} alt='logo' className='img-cours'/>
            </div>
        </Link>
    )
}

export default ListCours