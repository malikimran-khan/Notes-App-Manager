import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeMain from './pages/home/HomeMain';
import Login from './pages/form/Login';
import Signup from './pages/form/Signup';
import VerifyEmail from './pages/form/VerifyEmail';
import DashboardMain from './pages/dashboard/DashboardMain';

// Wrapper component to conditionally render Navbar & Footer
function Layout({ children }) {
  const location = useLocation();
  const hideNavbarFooter = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      {children}
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomeMain />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify/:token' element={<VerifyEmail />} />
          <Route path='/dashboard/*' element={<DashboardMain />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
