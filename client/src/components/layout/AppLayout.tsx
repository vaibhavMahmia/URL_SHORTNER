import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../UI/Navbar';

export const AppLayout: React.FC = () => <div className="h-screen container m-auto rounded-lg shadow-lg border border-gray-500/40">
  <div className="sticky top-0 z-50">
      <Navbar />
  </div>
  <div className='p-4 flex items-center justify-center'>
    <Outlet />
  </div>
</div>;
