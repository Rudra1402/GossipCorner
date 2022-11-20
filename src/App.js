import React from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import Signup from './components/Signup'
import Gossips from "./components/Gossips";

function App() {

  const API = 'https://gossip-corner.herokuapp.com'

  return (
    <Router>
      <div className="flex">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home api={API} />} />
          <Route path='/gossips' element={<Gossips api={API} />} />
          <Route path='/profile' element={<Profile api={API} />} />
          <Route path='/login' element={<Login api={API} />} />
          <Route path='/signup' element={<Signup api={API} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
