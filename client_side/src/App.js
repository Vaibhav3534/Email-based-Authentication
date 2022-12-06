
// import './App.css';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { Router, Route, Routes } from "react-router-dom"
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {

  return (
    <div className="App">
    
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Profile/>}/>
        {/* <Route path='/profile' element={<Profile/>}/> */}
      </Routes>
      
    </div>
  );
}

export default App;
