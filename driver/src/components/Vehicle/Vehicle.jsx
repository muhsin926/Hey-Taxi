import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import url from "../../api/Api";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../redux/slices/ModalSlice";
import toast, { Toaster } from "react-hot-toast";

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editV, setEditV] = useState({})
  const { showModal } = useSelector((state) => state.modal);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  const getVehicles = useCallback(async () => {
    const { data } = await axios.get(`${url}/api/driver/vehicle`);
    setVehicles(data.vehicles);
  }, [vehicles]);

  const handleEdit = (vehicle) => {
    setEditV(vehicle)
    dispatch(setShowModal())
  }

  const deleteVehicle = async (id) => {
    setIsLoading(true)
    await axios.delete(`${url}/api/driver/vehicle?vehicleId=${id}`)
    setIsLoading(false)
    toast.success("Vehicle Deleted")
  }

  useEffect(() => {
    getVehicles()
  }, [isLoading])
  return (
    <div>
      <Toaster />
      <div className="flex justify-end">
        <button
          className="py-1 px-3 bg-black hover:bg-gray-800 text-white rounded"
          onClick={() => dispatch(setShowModal())}
        >
          Add Vehicle
        </button>
      </div>
      {showModal && <Modal edit={editV} setLoading={setIsLoading} loading={isLoading} />}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className=" arc"></div>
        </div>
      ) : (
        <section className={`${vehicles.length <= 0 && 'flex justify-center items-center w-full h-32'}`}>
          <div className="relative overflow-x-auto">
            {vehicles.length > 0 ? (
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Model Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Registration Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Insurance
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rgistration Certificate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr className="bg-white border-b hover:bg-gray-100">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {vehicle.category}
                    </th>
                    <td className="px-6 py-4">{vehicle.model}</td>
                    <td className="px-6 py-4">{vehicle.reg_no}</td>
                    <td className="px-6 py-4">
                      <img className="w-12" src={vehicle.insurance} alt="" />
                    </td>
                    <td className="px-6 py-4">
                      <img className="w-12" src={vehicle.RC} alt="" />
                    </td>
                    <td className="px-6 py-4 ">
                      <FontAwesomeIcon className="cursor-pointer" onClick={() => handleEdit(vehicle)} icon={faPenToSquare} />
                    </td>
                    <td className="px-6 py-4">
                      <FontAwesomeIcon className="text-red-500 cursor-pointer" onClick={() => deleteVehicle(vehicle._id)} icon={faTrash} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            ):(
              <div className="text-red-500">No vehicle please add </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Vehicle;
