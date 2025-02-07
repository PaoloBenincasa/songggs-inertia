import React from 'react';
import Navbar from '../Components/Navbar/Navbar';


const Layout = ({ children }) => {
  return (

        <div className='max-vh-100'>
          <Navbar />
          <main className='childHeight'>{children}</main>
        </div>
    
  );
};

export default Layout;
