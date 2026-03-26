import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    // 1. Full height container, no overflow here
    <div className="flex h-screen  overflow-hidden">
      {/* 2. SIDEBAR: Fixed via 'h-screen' and 'sticky' or 'fixed' inside the component */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* 3. MAIN WRAPPER: This must handle the scroll */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* 4. HEADER: Sticky to the top of this scrollable div */}
        <Header setIsMobileOpen={setIsMobileOpen} />

        {/* 5. CONTENT AREA */}
        <main className="p-6 lg:p-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
