import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Table from "./Table";
import { Outlet } from "react-router-dom";


const AdminPotel = () => {
  const [selectedTab , setSelectedTab] = useState("All student");
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar  selectedTab={selectedTab} setSelectedTab={setSelectedTab}  />
        <div>
            <SearchBar/>
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AdminPotel;
