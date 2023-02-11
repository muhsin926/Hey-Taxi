import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Vehicle } from "./components";
import DashboardPage from "./pages/DashboardPage";
import DocUploaderPage from "./pages/DocUploaderPage";
import Loginpage from "./pages/Loginpage";
import RequirementPage from "./pages/RequirementPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage component={Dashboard} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/requirements" element={<RequirementPage />} />
          <Route path="/requirements/docUpload" element={<DocUploaderPage />} />
          <Route path="/vehicles" element={<DashboardPage component={Vehicle} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
