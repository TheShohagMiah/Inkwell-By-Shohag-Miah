import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    // min-h-screen ensures the footer stays at the bottom even on empty pages
    <div className="">
      {/* 1. FIXED NAVIGATION */}
      <Navbar />

      {/* 2. MAIN CONTENT AREA */}
      <main className="grow">
        {/* pt-20: Padding top for mobile navbar
          sm:pt-24: Increased padding for desktop navbar
          mx-auto: Centers the content
          max-w-7xl: Prevents the blog from looking "stretched" on 4K monitors
          px-4 to px-8: Responsive side padding so text doesn't hit the screen edges
        */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* 3. FOOTER */}
      <Footer />
    </div>
  );
};

export default MainLayout;
