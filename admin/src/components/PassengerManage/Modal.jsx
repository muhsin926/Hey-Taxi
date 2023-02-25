import React from "react";
import { useDispatch } from "react-redux";
import { setUnPassModal } from "../../redux/Slices/ModalSlice";

const Modal = ({ passenger }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-1/3">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex text-black flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <form>
              <div className="flex items-start  justify-between bg-yellow-300  rounded-t">
                <h3 className="text-2xl font-base ml-6 py-6 text-black font-semibold">
                  Driver Details
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => dispatch(setUnPassModal())}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 h-64 flex flex-col scrollbar-hide overflow-y-auto">
                <div>Name: {passenger.name}</div>
                <div>Email: {passenger.email}</div>
                <div>Mobile: {passenger.mobile}</div>
                <div>Type: {passenger.type}</div>
                <h1 className="text-xl font-medium">Vehicles</h1>
                {/* <div>
                  {driver.vehicles.map((vehicle) => {
                    {
                      vehicle.category;
                    }
                    {
                      vehicle.model;
                    }
                    <>
                      <h1>
                        RC Book: <img className="w-20" src={vehicle.RC} alt="" />
                      </h1>
                      <h1>
                        Insurance: <img className="w-20" src={vehicle.insurance} alt="" />
                      </h1>
                    </>;
                  })}
                </div> */}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end pt-3 pr-3 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 hover:bg-gray-200 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => dispatch(setUnPassModal())}
                >
                  Close
                </button>
                <button
                  className="bg-black text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
