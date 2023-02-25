import React, { useState } from "react";
import axios from "axios";
import url from "../../api/Api";
import { toast, Toaster } from "react-hot-toast";

const Modal = ({ setShowModal, setIsLoading }) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState();
  const [rate, setRate] = useState();
  const [discription, setDiscription] = useState("");
  const [img, setImage] = useState();

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const fileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertBase64(file);
    setImage(base64);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(`${url}/api/admin/vehicle`, { name, capacity, discription, img })
      .then((res) => {
        if (res.data.status) {
          setIsLoading(false);
          setShowModal(false);
          toast.success("category added");
        } else {
          toast.error(res.data.err);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <>
      <Toaster />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex text-black flex-col w-full bg-white outline-none focus:outline-none">
            <form onSubmit={submitHandler}>
              <div className="flex items-start  bg-yellow-300  justify-between  rounded-t">
                <h3 className="text-xl font-base ml-6 py-6">Add Categories</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex flex-col">
                <input
                  type="text"
                  placeholder="category name"
                  className="border border-grey-light w-full p-3 rounded mb-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="border border-grey-light w-full p-3 rounded mb-4"
                  type="number"
                  placeholder="capacity"
                />
                <input
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="border border-grey-light w-full p-3 rounded mb-4"
                  type="number"
                  placeholder="rate per KM"
                />
                <input
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  className="border border-grey-light w-full p-3 rounded mb-4"
                  type="text "
                  placeholder="discription"
                />
                <input
                  onChange={fileUpload}
                  className="border border-grey-light w-full p-3 rounded mb-4"
                  type="file"
                />
              </div>
              <div className="flex items-center justify-end pr-4 pt-4 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 hover:bg-gray-200 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
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
