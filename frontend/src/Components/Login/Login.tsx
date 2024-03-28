import axios from 'axios';
import {useForm} from 'react-hook-form';
import './style.scss';
import { useNavigate,Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface INewUser{
    username:String,
    email:String,
    password:string
}

export const Login = () => {
 const navigate = useNavigate(); 
const form = useForm<INewUser>({
    email:'',
    password:''
});
const {register,handleSubmit,formState} = form; 
const {errors} = formState;
const handleForm = (data:INewUser) => {
    axios.post('/auth/login',data,{withCredentials:true})
        .then(res=>{toast.success(res.data.message),navigate('/profile',{state:{role:res.data.role,username:res.data.username}})})
            .catch(err=>toast.error(err.response.data.message))
}
    return(
        <>
        <h1 style={{textAlign:'center'}}>Wisdom Well Library</h1>
        <div className='login-container'>
            
            <div className='image-container'>
            </div>
          <form onSubmit={handleSubmit(handleForm)}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' {...register('email',{
                    required:{
                        value:true,
                        message:'email id required'
                    }
                })} />
                <p className='errortext'>{errors.email?.message}</p>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' {...register('password',{
                    required:{
                        value:true,
                        message:'please enter your passowrd'
                    }
                })} />
                <p className='errortext'>{errors.password?.message}</p>
                <Link to='/forgotpassword'>Forgot Password</Link>
                <button>Login</button>
            </form>
        </div>
        </>
    )
}