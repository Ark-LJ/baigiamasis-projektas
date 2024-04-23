import fb from "./images/fb.png"
import insta from "./images/insta.png"
import eX from "./images/eX.png"

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="contacts">
                    <h3>Contacts:</h3>
                    <div>
                        <p>Address:</p>
                        <p>Gedemino G-Ve 12.</p>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <p>+3706000000</p>
                    </div>
                    <div>
                        <p>Email Address:</p>
                        <p>Movie.time@gmail.com</p>
                    </div>
                </div>
                <div className="location">
                    <h3>Pick Up Locations:</h3>
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
                    <img src={fb} alt="Facebook" />
                    <img src={insta} alt="Instagram" />
                    <img src={eX} alt="Twitter" />
                </div>
            </div>
        </footer>
    )
}

export default Footer