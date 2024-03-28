import { useLocation, useNavigate, Link } from "react-router-dom"
import axios from 'axios';
import {toast} from 'react-toastify';
import './style.scss';

export const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const role = location.state.role;
    const handleLogout = () => {
        axios.get('auth/logout')
            .then(res=>{toast.success(res.data.message),navigate('/')})
                .catch(err=>toast.error(err));
    }
    return(
        <div className="Profile-container">
            <div className="menu-container">
                <p>Welcome {location.state.username}</p>
                <div className="menu">
                    <Link to='/newuser' className="menu-link">{role === 'admin' ? 'Add user' : 'View Profile' }</Link>
                    {
                        role === 'admin' ? <></> :  <Link to='/resetpassword' className="menu-link">Reset Password</Link>
                    }
                   
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            
        </div>
    )
}