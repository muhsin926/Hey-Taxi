import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/SideBar/SideBar";

const DashboardPage = () => {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen py-10 bg-black grid grid-cols-12 text-white">
        <aside className="hidden md:block col-span-2 ml-7  bg-zinc-800 h-3/4 w-full p-8 rounded-lg">
          <SideBar />
        </aside>
        <section className="col-span-10 ml-12 w-11/12 bg-zinc-800  rounded-xl p-10">
          <Dashboard />
        </section>
      </section>
    </main>
  );
};

export default DashboardPage;
