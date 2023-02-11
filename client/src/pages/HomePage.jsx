import Axios from "axios";
import React from "react";
import { Hero, Navbar, WhyRide } from "../components";
import Footer from "../components/Footer/Footer";
import HowToRide from "../components/Home/HowToRide";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

const HomePage = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <WhyRide />
        <HowToRide />
        <Footer />
    </>
  );
};

export default HomePage;
