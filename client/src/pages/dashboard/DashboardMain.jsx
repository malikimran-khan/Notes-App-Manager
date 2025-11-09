import React from 'react';
import { Routes, Route } from "react-router-dom";
import SideBar from './SideBar';
import Home from './Home';
import CreateNotes from './CreateNotes';
import ShowNotes from './ShowNotes';
import Logout from './Logout';
export default function DashboardMain() {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
      <SideBar/>
      <div className="flex-1 p-6 overflow-y-auto lg:ml-64">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/create-notes' element={<CreateNotes/>}></Route>
          <Route path='/show-notes' element={<ShowNotes/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
        </Routes>
      </div>
    </div>
    </>
  );
}
