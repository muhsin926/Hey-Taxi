import React from "react";
import { backgroundVideo } from "../../assets";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen">
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        className="w-full  h-full object-cover"
      />
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
        className="mainCard xs:w-96 mr-10 xs:mr-0 p-10 bg-white  rounded"
      >
        <motion.div
          initial={{ y: "-10vw", opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ type: "Tween", stiffness: 1, delay: 0.6 }}
          className="flex justify-around  "
        >
          <h1 className="text-2xl btmBorder">Ride</h1>
          <h1 className="text-2xl">Drive</h1>
        </motion.div>
        <motion.div
          initial={{ y: "-10vw", opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.6 }}
          className="flex justify-center align-middle mt-10"
        >
          <h1 className="text-3xl font-semibold mb-7">Request a ride now</h1>
        </motion.div>
        
        <motion.div
          initial={{ y: "-10vw", opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 1 }}
        >
          <button
            className="text-center py-2 px-3 rounded bg-yellow-400  my-1 font-semibold"
            onClick={() => navigate('/ride')}
          >Request Now</button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
