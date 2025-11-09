import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import HomeMain from './pages/home/HomeMain'
import Login from './pages/form/Login';
import Signup from './pages/form/Signup';
import AboutMain from './pages/about/AboutMain';
import VerifyEmail from './pages/form/VerifyEmail';
import DashboardMain from './pages/dashboard/DashboardMain';
export default function App() {
  return (
    <>
    <BrowserRouter>
    {/* <Navbar/>  */}
      <Routes>
        <Route path='/' element={<HomeMain/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/about' element={<AboutMain/>}></Route>
        <Route path="/verify/:token" element={<VerifyEmail/>} />
        <Route path='/dashboard/*' element={<DashboardMain/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}
