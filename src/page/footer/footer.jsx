
import './footer.css'
import smallLogo from '../../assets/logoHeadv2.png'


const Footer = () => {

    return(
        <div className="footer-div">

            <section className="footer-section">
                <p> © 2026 TheDashBoard — Tous droits réservé <img className='footImg' src={smallLogo} /></p>
            </section>

        </div>
    )

}

export default Footer