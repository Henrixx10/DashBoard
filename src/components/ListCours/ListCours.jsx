import { Link } from 'react-router-dom'
import { cours, getByName } from '../../data/coursData'
import './ListCours.css'

const ListCours = ({obj}) => {

    const nameCours = obj.coursName.split('-')[0]

    return( 
        <Link to={`/cours/${obj.coursName}`} className='link'>
            <div className="card-box">
                <h3 className="Name">{nameCours}</h3>
                <img src={obj.coursImg} className='img-cours'/>
            </div>
        </Link>
    )
}

export default ListCours