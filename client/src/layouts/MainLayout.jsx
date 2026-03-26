import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    /* flex flex-col min-h-screen: 
      Standard industry practice to keep footer at the bottom.
    */
    <div className="flex flex-col min-h-screen transition-colors duration-500">
      {/* 01 / NAVIGATION LAYER */}
      <Navbar />

      {/* 02 / DYNAMIC CONTENT NODE */}
      <main className="flex-grow pt-24 sm:pt-32">
        {/* max-w-7xl: Standard container width for readability.
          mx-auto: Centers the content node.
        */}
        <div className="container max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-20">
          <Outlet />
        </div>
      </main>

      {/* 03 / TERMINAL LAYER */}
      <Footer />
    </div>
  );
};

export default MainLayout;
