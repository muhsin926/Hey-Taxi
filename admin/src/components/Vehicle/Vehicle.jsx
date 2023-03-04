import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import url from "../../api/Api";

const Vehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [pageNumber, setPageNumber] = useState(0)

  const getVehicles = async () => {
    const { data } = await axios.get(`${url}/api/admin/vehicle`);
    setVehicles(data.vehicles);
  };

  useEffect(() => {
    getVehicles();
  }, [isLoading]);

  const deleteAcc = async (id) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${url}/api/admin/vehicle?id=${id}`);
    setIsLoading(false);
    data.status && toast.success("successfully deleted");
  };


  const usersPerPage = 5;
  const pageVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(vehicles.length / usersPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  const displayRows = vehicles?.slice(pageVisited, pageNumber + usersPerPage)
    .map((vehicle) => {
      return (
        <tr className="hover:bg-gray-900">
          <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
            {vehicle.category}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {vehicle.model}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {vehicle.reg_no}
          </td>
          <td className="px-6 py-4 text-sm text-center text-gray-200 whitespace-nowrap">
            {vehicle.driverId?.name}
          </td>
          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
            <a
              className="text-red-500 hover:text-red-700"
              href="#"
              onClick={() => deleteAcc(vehicle._id)}
            >
              Delete
            </a>
          </td>
        </tr>
      )
    })

  return (
    <div>
      <section>
        <div className="flex flex-col">
          {vehicles?.length > 0 ? (
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
                    className="block w-full p-3 pl-10 text-sm bg-zinc-600 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500"
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
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className=" arc"></div>
                </div>
              ) : (
                <>
                  <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-auto border rounded-lg">
                      <table className="min-w-full divide-y divide-black">
                        <thead className="bg-black">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                            >
                              Model
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                            >
                              Registration
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                            >
                              Owner
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
                </>
              )}
            </div>
          ) : (
            <div className="text-red-500 text-center">There is no data</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Vehicle;
