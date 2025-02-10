import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { usePage } from '@inertiajs/react';


const Layout = ({ children }) => {

  return (

        <div className='max-vh-100'>
          <Navbar/>
          <main >{children}</main>
        </div>
    
  );
};

export default Layout;
