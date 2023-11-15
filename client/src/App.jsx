import Header from "./components/Header";
import Footer from "./components/Footer";
// import { useState, useEffect } from 'react'
// import axios from 'axios';
import { Outlet } from "react-router-dom";


const App = () => {

  return (
    <>
    <div className="lightGrey-bg flex flex-col min-h-screen">
   <Header />

<Outlet />

    <Footer />
    </div>
    </>
  )
}
    

export default App;
