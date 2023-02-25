import React from "react";
import { howToRide } from "../../constants";


const HowToRide = () => {
  return (
    <section className="md:ml-12 md:mr-12 md:mb-12 md:p-10 ml-6 mr-6  p-5 ">
      <h1 className="md:text-3xl sm:text-3xl font-semibold">
        How to ride with hey taxi
      </h1>
      <div className="flex flex-col mt-10">
        {howToRide.map((data, index) => (
          <div className=" mt-0.5 ">
            <div className="flex">
              <div className="w-2 bg-stone-700 h-2"></div>
              <div className="ml-4 -mt-2 font-semibold text-2xl ">
                {data.title}
              </div>
            </div>
            <div>
              <div className="flex -mt-2">
                <div className=" ">
                  <div
                    className={`${index == howToRide.length - 1 ? "hidden" : null
                      } w-0.5 h-40 bg-stone-700 ml-0.5 -mt-0.5`}
                  ></div>
                </div>
                <div className=" ml-5 mt-6">{data.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToRide;
