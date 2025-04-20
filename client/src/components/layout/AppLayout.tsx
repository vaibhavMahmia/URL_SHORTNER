import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../UI/Navbar';

export const AppLayout: React.FC = () => {
  return (
    <div className="h-screen">
        <Navbar/>
        <div className='p-4 flex items-center justify-center'>
         <Outlet />
        </div>
    </div>
  )
}
