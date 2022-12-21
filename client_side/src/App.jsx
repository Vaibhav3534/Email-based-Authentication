
// import './App.css';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { Router, Route, Routes } from "react-router-dom"
import Login from './Components/Login';
import Profile from './Components/Profile';
import ButtonAppBar from './Components/Navbar';
import Calculator from './Components/calculator';
import FormDialog from './Components/ForgotPassword';
import { toast, Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './Router/PrivateRoute';

function App() {

  

  return (
    <div className="App">
      {/* <Toaster/> */}
      <ButtonAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route path='/profile'
          element={
            <PrivateRoute child={<Profile/>} />
          
          } />

        <Route path='/add' element={<Calculator />} />
        <Route path='/forgotpassword' element={<FormDialog />} />
      </Routes>

    </div>
  );
}

export default App;
