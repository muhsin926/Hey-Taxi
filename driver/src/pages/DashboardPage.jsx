import React from "react";
import { Dashboard, Navbar, SideBar } from "../components";

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <main className='h-[38rem] md:py-8 py-4 grid  grid-cols-12'>
        <aside className='hidden md:block col-span-2 ml-7 border shadow-lg  w-full p-8 rounded-lg'>
          <SideBar />
        </aside>
        <section className='md:col-span-10 col-span-12 md:mx-4 mx-2 md:ml-12 sm:w-11/12 md:p-10 p-2 border shadow-lg rounded-xl '>
          <Dashboard />
        </section>
      </main>
    </>
  );
};

export default DashboardPage;
