import React from "react";
import {
  faFileInvoice,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { requirements } from "../../constants";

const Requirements = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="flex my-5 flex-col sm:w-3/6">
        <h1 className="my-8 text-3xl font-bold">Welcome muhsin</h1>
        <h1 className="text-xl font-medium">Rmaining steps</h1>
        <p className="text-slate-600 mt-2 mb-4 text-md">
          Here's what you need do to set up your account
        </p>
        {requirements.map((data, i) => (
          <>
            <Link
              to={{
                pathname: "/requirements/docUpload",
                search: `?param=${i}`,
              }}
              className="flex flex-row "
            >
              <div className="flex items-center mr-6">
                <FontAwesomeIcon className="" icon={faFileInvoice} />
              </div>
              <div className="flex justify-between w-full">
                <div className="mt-4 ">
                  <h1 className="text-lg font-medium ">{data.head}</h1>
                  <p>{data.title}</p>
                </div>
                <div className="flex items-center  ">
                  <FontAwesomeIcon className="" icon={faChevronRight} />
                </div>
              </div>
            </Link>
            <div className="pl-7">
              <hr className="mt-4 w-full " />
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default Requirements;
