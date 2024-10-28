import React, { useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import AdminNavBar from "../../../components/AdminNavbar/AdminNavbar";
import ManageEvents from "../../../components/ManageEvents/ManageEvents";
import ManageGames from "../../../components/ManageGames/ManageGames";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const sidebarWidth = 250;
  const handleClicking = (id) => {
    setActiveTab(id);
  };
  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <>Dashboard</>;
      case 2:
        return (
          <>
            <ManageEvents />
          </>
        );
      case 3:
        return (
          <>
            <ManageGames />
          </>
        );
      default:
        return false;
    }
  };
  return (
    <div className="bg-background w-screen h-screen overflow-x-hidden">
      <AdminNavBar />
      <AdminSidebar
        activeTab={activeTab}
        handleClicking={handleClicking}
        width={sidebarWidth}
      />
      <div
        className={`flex justify-center items-center mt-[100px] h-auto text-black `}
        style={{
          width: `calc(100vw - ${sidebarWidth}px)`,
          marginLeft: `${sidebarWidth}px`,
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
