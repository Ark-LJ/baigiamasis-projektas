import fb from "../components/images/fb.png"
import insta from "../components/images/insta.png"
import eX from "../components/images/eX.png"

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="contacts">
                    <h3>Contacts:</h3>
                    <div>
                        <p className="address">Address:</p>
                        <p>Gedemino G-Ve 12.</p>
                    </div>
                    <div>
                        <p className="phone">Phone:</p>
                        <p>+3706000000</p>
                    </div>
                    <div>
                        <p className="address">Email Address:</p>
                        <p>Movie.time@gmail.com</p>
                    </div>
                </div>
                <div className="location">
                    <h3 className="pickup-locations">Pick Up Locations:</h3>
                    <ul>
                        <li>High Street 12 , London</li>
                        <li>Station Road 78 , London</li>
                        <li>Main Street 34 , Liverpool</li>
                        <li>Park Road, 36, Liverpool</li>
                        <li>Church Road 99, Manchester</li>
                        <li>Church Street 76, Birmingham</li>
                        <li>London Road 11, Birmingham</li>
                        <li>Victoria Road 12,Bradford</li>
                    </ul>
                </div>
                <div className="socials">
                    {/* Using target="_blank" without rel="noreferrer" (which implies rel="noopener") 
                    is a security risk in older browsers */}
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                        <img src={fb} alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                        <img src={insta} alt="Instagram" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <img src={eX} alt="Twitter" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer