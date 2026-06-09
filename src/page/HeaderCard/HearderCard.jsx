
import { Link, NavLink } from 'react-router-dom'
import './HeaderCard.css'

const HeaderCard = ({urlname}) => {

    return (
        <div className="head">
            <NavLink to={`/cours/${urlname}`} className='Link-head'>
                <a className="link-a">Synthèse</a>
            </NavLink>


            <NavLink to={`/Question/${urlname}`} className='Link-head'>
                <a className="link-a">Fiches de révisions</a>
            </NavLink>

            <NavLink to={`/modifyCours/${urlname}`} className='Link-head'>
                <a className="link-a">Modifier</a>
            </NavLink>


        </div>
    )

}

export default HeaderCard