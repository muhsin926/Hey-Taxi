import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUnShowModal } from "../../redux/slices/ModalSlice";
import Paypal from "./Paypal";

const Modal = () => {
  const { fare, payment } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative   my-6 mx-auto md:w-1/3  ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex text-black flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start bg-black justify-between border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-base ml-6 py-4 text-white">
                Payment Methode
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => dispatch(setUnShowModal())}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-col ">
              {payment ? (
                <div className="relative p-6 w-full min-h-fit  ">
                  <h1>
                    Your booking has been requested please wait for accept
                  </h1>
                </div>
              ) : (
                <div className="relative  w-full min-h-fit  ">
                  <Paypal fare={fare} />
                </div>
              )}
              <div className="flex justify-end">
                <button
                  className="text-red-500 rounded hover:bg-gray-200 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => dispatch(setUnShowModal())}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40  bg-black"></div>
    </>
  );
};

export default Modal;
