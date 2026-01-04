import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserLayout = () => {
  useEffect(() => {
    toast('This section is currently under maintenance! Some functionalities have been disabled for now. Sorry for the inconvenience!', {
      position: 'top-center',
      autoClose: 10000,
      style: {
        width: '450px',
        backgroundColor: '#fff000',
        color: '#ff0000',
        border: '1px solid #ff0000',
      },
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-terminal-bg">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
