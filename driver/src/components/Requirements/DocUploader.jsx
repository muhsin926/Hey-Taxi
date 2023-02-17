import React, { useRef, useState } from "react";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { docUplod } from "../../constants";
import axios from "axios";
import url from "../../api/Api";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  setDL,
  setInsurance,
  setOther,
  setRC,
} from "../../redux/slices/DocumentsSlice";

const DocUploader = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [model, setModel] = useState("");
  const [reg, setReg] = useState("");
  const [file, setFile] = useState();
  // const [url, setUrl] = useState("");

  const fileInput = useRef(null);
  const handleFileButtonClick = () => {
    fileInput.current.click();
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const index = queryParams.get("param");

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

  const validateFile = (file) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const errors = [];

    if (!allowedExtensions.exec(file.name)) {
      errors.push("Invalid file type. Only JPEG and PNG files are allowed.");
    }
    if (file.size > maxSize) {
      errors.push("File size is too large. Maximum size allowed is 5MB.");
    }

    return errors;
  };

  const fileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    const errors = validateFile(selectedFile);
    if (errors.length > 0) {
      setFile(null);
      toast.error(errors.join("\n"));
    } else {
      setFile(selectedFile);
      const base64 = await convertBase64(file);
      axios
        .post(`${url}/api/driver/docUpload`, { image: base64, index })
        .then((response) => {
          if (index == 0) {
            dispatch(setDL);
          } else if (index == 1) {
            dispatch(setRC);
          } else if (index == 2) {
            dispatch(setInsurance);
          } else {
            dispatch(setOther);
          }
          toast.success("succesful uploaded");
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/driver/docUpload`, {
        vehicleCategory,
        model,
        reg,
        index,
      });
      res.data.status && alert("succesful upload");
    } catch (err) {
      toast.error(err);
    }
  };

  const getCategory = async () => {
    const response = await axios.get(`${url}/api/passenger/carCategory`);
    setCategory(response.data.cat);
  };

  getCategory();

  return (
    <div className="flex items-center h-screen justify-center scrollbar-hide overflow-y-auto ">
      <div className="md:w-2/5 sm:w-3/5 w-11/12 border-2 ">
        <div className="bg-black p-3 ">
          <Link to={"/requirements"}>
            <FontAwesomeIcon
              className="text-white text-2xl"
              icon={faCircleArrowLeft}
            />
          </Link>
        </div>
        {index == 3 ? (
          <div className="h-96 scrollbar-hide overflow-y-auto mt-3 p-7 flex-col  flex justify-center ">
            <form onSubmit={submitHandler}>
              <label htmlFor="">Select Vehicle Category</label>
              <select
                className="w-full py-4 border  border-gray-300  rounded-lg  focus:border-gray-200  mb-5"
                onChange={(e) => setVehicleCategory(e.target.value)}
              >
                <option className="hidden">Select Vehicle Category</option>
                {category.map((cat) => (
                  <option>{cat.name}</option>
                ))}
              </select>
              <label className="items-start" htmlFor="Model">
                Vehicle Model
              </label>
              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                type="text"
                className="w-full pl-3 focus:shadow-lg shadow-black focus:border-gray-400  py-4 border border-gray-300 rounded-lg mb-5"
                placeholder="model name"
                id="model"
              />
              <label htmlFor="reg.no">Registration Number</label>
              <input
                value={reg}
                onChange={(e) => setReg(e.target.value)}
                type="text"
                className="w-full pl-3 py-4 border border-gray-300 rounded-lg mb-5"
                placeholder="vehicle registration number"
                id="reg.no"
              />
              <button
                type="submit"
                className="w-full bg-black rounded text-white text-center"
              >
                Save
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="h-96 overflow-scroll overflow-x-hidden  p-5 flex flex-col justify-center items-center  ">
              <h1 className="text-3xl font-bold mt-44">
                {docUplod[index].title}
              </h1>
              <p className="">{docUplod[index].description}</p>
              <img
                className="max-w-sm m-12"
                src={docUplod[index].img}
                alt="RC image"
              />
            </div>
            <div className="p-3">
              <button
                onClick={handleFileButtonClick}
                className="w-full bg-black rounded text-white text-center"
              >
                {" "}
                Upload
              </button>
              <input
                onChange={fileUpload}
                type="file"
                className="hidden"
                ref={fileInput}
              />
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default DocUploader;
