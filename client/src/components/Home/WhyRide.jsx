import React, { useEffect } from "react";
import { whyRide } from "../../constants";
import { useAnimation, motion, delay } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";



const squareVariants = {
  visible: { opacity: 1, y: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, y: "-4vw" },
};

const squareVariants1 = {
  visible: { opacity: 1, y: 1, transition: { duration: 0.5, delay: 0.5 } },
  hidden: { opacity: 0, y: "-4vw" },
};
const WhyRide = () => {
  const { socket } = useSelector((state) => state.socket)
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const socketCall = () => {
    socket.emit("send-request", {
      pickup: "pattambi",
      droppoff: "calicut",
      user_name: "Passenger",
      profile: "image"
    })
  }


  return (
    <section className="md:m-12 md:p-10 m-6 p-5  bg-white">
      <motion.h1
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={squareVariants}
        className="md:text-3xl sm:text-3xl font-semibold "
        onClick={() => socketCall()}
      >
        Why ride with hey taxi
      </motion.h1>
      <div className="grid md:grid-cols-2 ">
        {whyRide.map((data, d) => (
          <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={squareVariants1}
            className="mt-12"
          >
            <img src={data.icon} className="w-16 mb-3" alt="home icon" />
            <h1 className="text-2xl mb-5 ">{data.title}</h1>
            <h1>{data.description}</h1>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyRide;
