import { useNavigate } from "react-router-dom"

const Error = () => {
    const navigate = useNavigate()
    const handleGoBackClick = () => {
        navigate('/')
    }
    return ( 
        <div className="error_div">
            <div className="error_img">
                
            </div>
            <button className="error_btn" onClick={handleGoBackClick}>GO BACK TO MAIN</button>
        </div>
     );
}
 
export default Error;