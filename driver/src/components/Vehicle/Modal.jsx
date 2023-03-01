import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import url from "../../api/Api";
import { useDispatch } from "react-redux";
import { setShowModal, setUnShowModal } from "../../redux/slices/ModalSlice";
import { toast, Toaster } from "react-hot-toast";

const schema = yup.object().shape({
  category: yup.string().required(),
  model: yup
    .string()
    .required()
    .matches(/^\s*\S.*$/, "Whitespace is not allowed"),
  reg_no: yup
    .string()
    .required()
    .matches(/^\s*\S.*$/, "Whitespace is not allowed"),
  RC: yup.mixed().test("required", "please select a file", (value) => {
    return value && value.length;
  }),
  insurance: yup.mixed().test("required", "please select a file", (value) => {
    return value && value.length;
  }),
});

const Modal = ({ edit, loading, setLoading }) => {
  const [category, setCategory] = useState();
  const [img, setImg] = useState([]);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const convert2Base64 = (file) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const base64 = fileReader.result.toString();
      setImg([...img, base64]);
    };
    fileReader.readAsDataURL(file);
  };

  const submitForm = async (values) => {
    (await values.RC.length) > 0 && convert2Base64(values.RC[0]);
    (await values.insurance.length) > 0 && convert2Base64(values.insurance[0]);
    const token = localStorage.getItem("token");
    if (edit.category) {
      if (img.length > 1) {
        setLoading(true);
        const { data } = await axios.patch(
          `${url}/api/driver/vehicle?vehicleId=${edit._id}`,
          {
            values,
            img,
          }
        );
        setLoading(false);
        data.status
          ? toast.success("Vehicle Deltails Updated")
          : toast.error("somthing wrong please try again");
        edit = {};
        dispatch(setUnShowModal());
      } else {
      }
      if (img.length > 1) {
        const { data } = await axios.post(
          `${url}/api/driver/vehicle`,
          {
            values,
            img,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLoading(false);
        data.status
          ? toast.success("Vehicle Added")
          : toast.error("somthing wrong please try again");
        dispatch(setUnShowModal());
      }
    }
  };

  const getCategory = async () => {
    const response = await axios.get(`${url}/api/passenger/carCategory`);
    setCategory(response.data.cat);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Toaster />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative  my-6 mx-auto w-1/3">
          <div className="border-0 rounded-lg shadow-lg relative flex text-black flex-col w-full bg-white outline-none focus:outline-none">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="flex items-start bg-black text-white justify-between  rounded-t">
                <h3 className="text-xl font-base ml-6 py-4">Add Vehicles</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => dispatch(setUnShowModal())}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 h-64 flex flex-col scrollbar-hide overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className=" arc"></div>
                  </div>
                ) : (
                  <>
                    <label htmlFor="">Select Vehicle Category</label>
                    <select
                      className="w-full py-2 pl-3 border  border-gray-300  rounded-lg  focus:border-gray-200  mb-4"
                      name="category"
                      value={edit?.category}
                      {...register("category")}
                    >
                      <option className="hidden">
                        Select Vehicle Category
                      </option>
                      {category?.map((cat) => (
                        <option>{cat.name}</option>
                      ))}
                    </select>
                    <label className="items-start" htmlFor="Model">
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      className="w-full pl-3 focus:shadow-lg  focus:border-gray-400  py-2 border border-gray-300 rounded-lg mb-4"
                      placeholder="model name"
                      id="items-start"
                      name="model"
                      value={edit?.model}
                      {...register("model")}
                    />
                    <p className="mb-4 text-red-600">{errors.model?.message}</p>
                    <label htmlFor="reg.no">Registration Number</label>
                    <input
                      type="text"
                      className="w-full pl-3 py-2 border border-gray-300 rounded-lg mb-4"
                      placeholder="vehicle registration number"
                      id="reg.no"
                      name="reg_no"
                      value={edit?.reg_no}
                      {...register("reg_no")}
                    />
                    <p className="mb-4 text-red-600">
                      {errors.reg_no?.message}
                    </p>
                    {img && <img src={img[0]} className="w-7" alt="" />}
                    <label htmlFor="RC">Upload RC Book</label>
                    <input
                      type="file"
                      className="w-full pl-3 py-2 border border-gray-300 rounded-lg mb-4"
                      id="RC"
                      name="RC"
                      // value={edit?.RC}
                      {...register("RC")}
                    />
                    <p className="mb-4 text-red-600">{errors.RC?.message}</p>
                    {img && <img src={img[1]} className="w-7" alt="" />}
                    <label htmlFor="insurance">Upload Insurance image</label>
                    <input
                      type="file"
                      className="w-full pl-3 py-2 border border-gray-300 rounded-lg"
                      id="insurance"
                      name="insurance"
                      // value={edit?.insurance}
                      {...register("insurance")}
                    />
                    <p className=" text-red-600">{errors.insurance?.message}</p>
                  </>
                )}
              </div>
              <div className="flex items-center pr-4 pt-4 justify-end border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 hover:bg-gray-200 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => dispatch(setUnShowModal())}
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
