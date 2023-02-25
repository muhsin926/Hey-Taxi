import React from "react";
import { Dashboard, Navbar, SideBar } from "../components";

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <main className='h-screen py-10 grid  grid-cols-12'>
        <aside className='hidden sm:block col-span-2 ml-7 border shadow-lg  h-3/4 w-full p-8 rounded-lg'>
          <SideBar />
        </aside>
        <section className='col-span-10 ml-12 w-11/12  border shadow-lg  rounded-xl p-10'>
          <Dashboard />
        </section>
      </main>
    </>
  );
};

export default DashboardPage;
