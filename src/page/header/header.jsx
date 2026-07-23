
import './header.css'
import Nav from '../../components/nav/nav'
import { Link } from 'react-router-dom'

function Header() {
  return(
    <main className="head_fixed">
      <section className="header">
        <Link className='header-title-link' to="/cours/">
          <h1 className="header-title">The DashBoard</h1>
        </Link>
        <Nav />
      </section>      
    </main>

  )
}

export default Header
