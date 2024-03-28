import { toast } from 'react-toastify';
import './style.scss';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IResetPassword{
    newpassword:string,
    confirmpassword:string
}
export const ResetPassword = () => {
    const navigate = useNavigate();
    const form = useForm<IResetPassword>({
        newpassword:'',
        confirmpassword:''
    });
    const {register,handleSubmit,formState} = form;
    const {errors} = formState;
    const handlePassword = (data:IResetPassword) => {
        if(data.newpassword !== data.confirmpassword){
            toast.error('passwords do not match');
        }
        axios.post('/auth/resetpassword',data,{withCredentials:true})
            .then(res=>{toast.success(res.data.message),navigate('/')})
                .catch((err)=>{toast.error(err.response.data.message)})
    }
    return(
        <>
        <button className='backbutton' onClick={()=>window.history.go(-1)}>Back</button>
        <div className='resetpassword-container'>
            <h2>Reset Password</h2>
           <form onSubmit={handleSubmit(handlePassword)}>
                <label htmlFor='newpassword'>New Password</label>
                <input type='password' className='newpassword' id='newpassword' {...register('newpassword',{
                    required:{
                        value:true,
                        message:'field cannot be empty'
                    }
                })} />
                <p className='errortext'>{errors.newpassword?.message}</p>
                <label htmlFor='confirmpassword'>Confirm Password</label>
                <input type='password' className='confirmpassword' id='confirmpassword' {...register('confirmpassword',{
                    required:{
                        value:true,
                        message:'field cannot be empty'
                    }
                })} />
                <p className='errortext'>{errors.confirmpassword?.message}</p>
                <button>Submit</button>
           </form>
        </div>
        </>
    )
}