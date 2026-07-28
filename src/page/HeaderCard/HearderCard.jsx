
import { Link, NavLink } from 'react-router-dom'
import './HeaderCard.css'

const HeaderCard = ({urlname}) => {

    return (
        <div className="head">
            <NavLink to={`/cours/${urlname}`} className='Link-head'>
                <a className="link-a">Synthèse</a>
            </NavLink>

            <NavLink to={`/cours/Notes/${urlname}`} className='Link-head'>
                <a className="link-a">Notes</a>
            </NavLink>


            <NavLink to={`/cours/Question/${urlname}`} className='Link-head'>
                <a className="link-a">To Do & Fiches</a>
            </NavLink>

            <NavLink to={`/cours/modifyCours/${urlname}`} className='Link-head'>
                <a className="link-a">Modifier</a>
            </NavLink>


        </div>
    )

}

export default HeaderCard