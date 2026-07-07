
import './header.css'
import Nav from '../../components/nav/nav'
import { Link } from 'react-router-dom'

function Header() {
  return(
    <section className="header">
      <Link className='header-title-link' to="/cours/">
        <h1 className="header-title">The DashBoard</h1>
      </Link>
      <Nav />
    </section>
  )
}

export default Header
