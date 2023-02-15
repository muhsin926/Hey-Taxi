import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Navbar, SideBar, Vehicle } from "./components";
import DashboardPage from "./pages/DashboardPage";
import DocUploaderPage from "./pages/DocUploaderPage";
import Loginpage from "./pages/Loginpage";
import RequirementPage from "./pages/RequirementPage";
import SignupPage from "./pages/SignupPage";
import VehiclesPage from "./pages/VehiclesPage";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <main className='h-screen py-10 grid  grid-cols-12'>
          <aside className='hidden sm:block col-span-2 ml-7 border shadow-lg  h-3/4 w-full p-8 rounded-lg'>
            <SideBar />
          </aside>
          <section className='col-span-10 ml-12 w-11/12  border shadow-lg  rounded-xl p-10'>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/requirements" element={<RequirementPage />} />
              <Route path="/requirements/docUpload" element={<DocUploaderPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
            </Routes>
          </section>
        </main>
      </Router>
    </>
  );
};

export default App;
