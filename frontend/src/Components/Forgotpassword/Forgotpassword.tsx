import {useState} from 'react';
import {toast} from 'react-toastify';
import './style.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Forgotpassword = () => {
    const [id,setId] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
       axios.post('auth/forgotpassword',{mailid:id})
        .then(res=>{toast.success(res.data.message),navigate('/')})
            .catch(err=>toast.error(err.response.data.message))
        
    }
    return(
        <div>
            <h1 style={{textAlign:'center'}}>Forgot Password</h1>
                <div className='form-container'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' className='email' onChange={(e)=>setId(e.target.value)}/>
                <button onClick={handleSubmit}>Submit</button>
                </div>
        </div>
    )
}