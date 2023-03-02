import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import DriverManagementPage from "./pages/DriverManagementPage";
import EarningsPage from "./pages/EarningsPage";
import LoginPage from "./pages/LoginPage";
import PassangerPage from "./pages/PassangerPage";
import VehicleCategoryPage from "./pages/VehicleCategoryPage";
import VehiclePage from "./pages/VehiclePage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact={true} element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/driver" element={<DriverManagementPage />} />
          <Route path="/vehicle" element={<VehiclePage />} />
          <Route path="/passenger" element={<PassangerPage />} />
          <Route path="/vehicle_category" element={<VehicleCategoryPage />} />
          <Route path="/earnings" element={<EarningsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
