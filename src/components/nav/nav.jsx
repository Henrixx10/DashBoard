
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import './nav.css'

const Nav = () => {

    return(
        <div className="nav">
            <NavLink className="btn" to="/cours">
                Cours
            </NavLink>

            <NavLink className="btn" to="/info/">
                Nos infos 
            </NavLink>

        </div> 
    )
}

export default Nav