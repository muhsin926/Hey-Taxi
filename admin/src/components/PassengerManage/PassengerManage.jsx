import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import url from "../../api/Api";
import ReactPaginate from "react-paginate";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

const Passenger = () => {
  const [passengers, setPassengers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0)
  const [search, setSearch] = useState('')

  const usersPerPage = 5;
  const pageVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(passengers.length / usersPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  const displayRows = passengers?.slice(pageVisited, pageNumber + usersPerPage)
    .map((passenger) => {
      return (
        <tr className="hover:bg-gray-900">
          <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
            {passenger.name}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {passenger.mobile}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {passenger.email}
          </td>
          <td
            className={`px-6 py-4 text-sm  whitespace-nowrap`}
          >
            <h1
              className={`${passenger.block
                ? "text-red-500"
                : "text-green-500"
                }`}
            >
              {passenger.block ? "Inactive" : "Active"}
            </h1>
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            <h1
              onClick={() =>
                updateUser(passenger._id, passenger.block)
              }
            >
              {passenger.block ? "Unblock" : "Block"}
            </h1>
          </td>
          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
            <a
              className="text-red-500 hover:text-red-700"
              href="#"
              onClick={() => deleteAcc(passenger._id)}
            >
              Delete
            </a>
          </td>
        </tr>
      )
    })

  const getPassengers = async () => {
    const { data } = await axios.get(`${url}/api/admin/passenger`);
    setPassengers(data.passenger);
  };

  useEffect(() => {
    if (search == '') {
    }
    getPassengers();
  }, [isLoading]);

  const searching = () => {
    const data = passengers.filter((info) => info.name.includes(search))
    setPassengers(data)
  }

  useEffect(() => {
    searching()
    if (search == '') {
      getPassengers()
    }
  }, [search])

  const updateUser = async (id, block) => {
    setIsLoading(true);
    await axios.patch(`${url}/api/admin/passenger?id=${id}`);
    setIsLoading(false);
    toast.success(`${block ? "User Unblocked" : "User Blocked"}`);
  };

  const deleteAcc = async (id) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${url}/api/admin/passenger?id=${id}`);
    setIsLoading(false);
    data.status && toast.success("successfully deleted");
  };

  return (
    <section>
      <Toaster />
      <div className="flex flex-col">
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
                value={search}
                onChange={e => setSearch(e.target.value)}
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
          ) : passengers.length > 0 ? (
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
            </>
          ) : (
            <div className="text-red-500 text-center">There is no data</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Passenger;
