import React from 'react';
import Navbar from '../Components/Navbar/Navbar';


const Layout = ({ children }) => {
  return (

        <div className='max-vh-100'>
          <Navbar />
          <main >{children}</main>
        </div>
    
  );
};

export default Layout;
