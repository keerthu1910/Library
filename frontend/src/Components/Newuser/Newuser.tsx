import {useForm} from 'react-hook-form';
import './style.scss';
import axios from 'axios';
import moment from 'moment';
import {toast} from 'react-toastify'

export interface INewUser{
    libraryid:String,
    firstname:String,
    lastname:String,
    mailid:String,
    password:String,
    phonenumber:Number,
    address:String,
    DOB:Date,
    gender:String,
    membership:String
}

export const Newuser = () => {
    const form = useForm({
    libraryid:'',
    firstname:'',
    lastname:'',
    mailid:'',
    password:'',
    phonenumber:0,
    address:'',
    DOB:'2020-01-01',
    gender:'',
    membership:''
    });
    const {register,handleSubmit} = form;
    const handleData = (data:INewUser) => {
        const fdob = moment(data.dob).format('YYYY-MM-DD');
        data.dob = fdob;
        axios.post('/user/newuser',{'data':data})
            .then(res=>toast.success(res.data))
                .catch(err=>toast.error(err.data.message))
    }
    return(
        <div className='newuser-registration-form-container'>
            <button onClick={()=>window.history.go(-1)}>Back</button>
            <form onSubmit={handleSubmit(handleData)}>
                <div>
                <label htmlFor='libraryid'>Library Id</label>
                <input type='text' id='libraryid' {...register('libraryid')} />
                </div>
                <div>
                <label htmlFor='firstname'>FirstName</label>
                <input type='text' id='firstname' {...register('firstname')} />
                </div>
                <div>
                <label htmlFor='lastname'>LastName</label>
                <input type='text' id='lastname' {...register('lastname')} />
                </div>
                <div>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' {...register('mailid')} />
                </div>
                <div>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' {...register('password')} />
                </div>
                <div>
                <label htmlFor='phonenumber'>PhoneNumber</label>
                <input type='number' id='phonenumber' {...register('phonenumber',{
                    valueAsNumber:true
                })} />
                </div>
                <div>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' {...register('address')} />
                </div>
                <div>
                <label htmlFor='dob'>DOB</label>
                <input type='date' id='dob' {...register('dob',{
                    valueAsDate:true,
                })} />
                </div>
                <div>
                <label htmlFor='gender'>Gender</label>
                <select id='gender' {...register('gender')}>
                    <option value={'male'}>Male</option>
                    <option value={'female'}>Female</option>
                </select>
                </div>
                <div>
                <label htmlFor='membership'>Membership</label>
                <input type='text' id='membership' {...register('membership')} />
                </div>
                <button>Add user</button>
            </form>
        </div>
    )
}