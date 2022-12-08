
// import './App.css';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { Router, Route, Routes } from "react-router-dom"
import Login from './Components/Login';
import Profile from './Components/Profile';
import ButtonAppBar from './Components/Navbar';
import Calculator from './Components/calculator';

function App() {

  return (
    <div className="App">
    
    <ButtonAppBar/>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route path='/profile' element={<Profile/>}/>
        {/* <Route path='/profile' element={<Profile/>}/> */}
        <Route path='/add' element={<Calculator/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
