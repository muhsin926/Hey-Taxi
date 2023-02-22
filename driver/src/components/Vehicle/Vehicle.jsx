import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import url from "../../api/Api";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../redux/slices/ModalSlice";

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editV, setEditV] = useState({})
  const { showModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const getVehicles = useCallback(async () => {
    const { data } = await axios.get(`${url}/api/driver/get-vehicles`);
    setVehicles(data.vehicles);
  }, [vehicles]);
  
  const handleEdit = (id) => {
    let editTo = vehicles.filter((vehi) => vehi._id == id)
    editTo = editTo[0]
    setEditV(editTo)
    dispatch(setShowModal())
  }
   useEffect(() => {
    getVehicles()
   },[])
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="py-1 px-3 bg-black text-white rounded"
          onClick={() => dispatch(setShowModal())}
        >
          Add Vehicle
        </button>
      </div>
      {showModal && <Modal edit={ editV} />}
      <section>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Passenger
                </th>
                <th scope="col" className="px-6 py-3">
                  Pickup Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Drop Off Location
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {vehicle.category}
                  </th>
                  <td className="px-6 py-4">{vehicle.model}</td>
                  <td className="px-6 py-4">{vehicle.reg_no}</td>
                  <td className="px-6 py-4">
                    <img className="w-12" src={vehicle.insurence} alt="" />
                  </td>
                  <td className="px-6 py-4">
                    <img className="w-12" src={vehicle.RC} alt="" />
                  </td>
                  <td className="px-6 py-4">
                    <FontAwesomeIcon onClick={() => handleEdit(vehicle._id)} icon={faPenToSquare} />
                  </td>
                  <td className="px-6 py-4">
                    <FontAwesomeIcon className="text-red-500" icon={faTrash} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Vehicle;
