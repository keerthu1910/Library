import { Login } from './Components/Login/Login';
import { Newuser } from './Components/Newuser';
import { Profile } from './Components/Profile/Profile';
import axios from 'axios';
import {Routes,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Forgotpassword, Mailresetpassword, ResetPassword } from './Components';
axios.defaults.baseURL = import.meta.env.VITE_APP_END_POINT;
axios.defaults.withCredentials = true;

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/newuser' element={<Newuser />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/resetmailpassword' element={<Mailresetpassword />} />
      </Routes>
    
    </div>
  )
}

export default App
