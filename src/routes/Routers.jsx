import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import TimesheetManager from "../components/TimesheetManager";

const Routers = () => {
    return (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/timesheet" element={<TimesheetManager />} />
          
          {/* Add more routes as needed */}
        </Routes>
    );
};

export default Routers;