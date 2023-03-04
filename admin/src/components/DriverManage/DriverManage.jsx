import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import url from "../../api/Api";
import { setShowModal } from "../../redux/Slices/ModalSlice";
import Modal from "./Modal";
import ReactPaginate from "react-paginate";

const DriverManage = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.modal);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0)
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState({});

  const getDrivers = async () => {
    const { data } = await axios.get(`${url}/api/admin/driver`);
    setDrivers(data.drivers);
  };

  useEffect(() => {
    getDrivers();
  }, []);

  const usersPerPage = 5;
  const pageVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(drivers.length / usersPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  const onClickHandler = (driver) => {
    dispatch(setShowModal());
    setDriver(driver);
  };

  const updateUser = async (id, block) => {
    setIsLoading(true);
    await axios.patch(`${url}/api/admin/driver?id=${id}&block=${block}`);
    toast.success(`${block ? "User Unblocked" : "User Blocked"}`);
    setIsLoading(false);
  };

  const deleteAcc = async (id) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${url}/api/admin/driver?id=${id}`);
    data.status && toast.success("successfully deleted");
    setIsLoading(false);
  };

  const displayRows = drivers?.slice(pageVisited, pageNumber + usersPerPage)
    .map((driver) => {
      return (
        <tr
          className="hover:bg-gray-900"
        // onClick={() => onClickHandler(driver)}
        >
          <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
            {driver.name}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {driver.mobile}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {driver.email}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {driver.available ? "Available" : "Unavailable"}
          </td>
          <td className={`px-6 py-4 text-sm  whitespace-nowrap`}>
            <h1
              className={`${driver.block ? "text-red-500" : "text-green-500"
                }`}
            >
              {driver?.block ? "Inactive" : "Active"}
            </h1>
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            <h1
              onClick={() => updateUser(driver._id, driver.block)}
            >
              {driver?.block ? "Unblock" : "Block"}
            </h1>
          </td>
          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
            <a
              className="text-red-500 hover:text-red-700"
              href="#"
              onClick={() => deleteAcc(driver._id)}
            >
              Delete
            </a>
          </td>
        </tr>
      )
    })

  return (
    <section>
      {showModal && <Modal driver={driver} />}
      <div className="flex flex-col">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className=" arc"></div>
          </div>
        ) : drivers.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="flex justify-between py-3 pl-2">
              <div className="relative max-w-xs">
                <label htmlFor="hs-table-search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Search..."
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    className="h-3.5 w-3.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                    <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                          />
                        </svg>
                      </div>
                      <div className="hidden sm:block">Filters</div>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-auto border rounded-lg">
                <table className="min-w-full divide-y divide-black">
                  <thead className="bg-black">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        Avialable
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        Action
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        delte
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black">
                    {displayRows}
                  </tbody>
                </table>
              </div>
            </div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        ) : (
          <div className="text-red-500 text-center">There is no data</div>
        )}
      </div>
    </section>
  );
};

export default DriverManage;
