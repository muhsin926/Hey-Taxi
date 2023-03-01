import React from "react";
import { blankProfile } from "../../assets";
import dateFormat, { masks } from "dateformat";

export const Table = ({ row }) => {
  return (
    <div>
      <>
        {row?.length > 0 ? (
          <div class="relative overflow-x-auto bg-black rounded-xl text-white">
            <table class="w-full text-sm text-left">
              <thead class="text-xs uppercase">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Driver
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Vehicle Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Pickup Location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Drop Off Location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Fare
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                {row.map((data) => (
                  <tr
                    class="text-black border-b hover:bg-gray-200 bg-gray-100"
                    key={data._id}
                  >
                     <td class="px-6 py-4">
                        {dateFormat(data?.updatedAt, "mmm d, yyyy")}
                      </td>
                    <td class="px-6 py-4 flex items-center">
                      <img
                        src={blankProfile}
                        className="w-10 rounded-full mr-2 "
                        alt="profile"
                      />
                      {data.receiver?.name}
                    </td>
                  
                      <td class="px-6 py-4">
                        {data.category?.name}
                      </td>
                
                    <td class="px-6 py-4">{data?.pickupLocation}</td>
                    <td class="px-6 py-4">{data?.destination}</td>
                    {data?.finished && (
                      <td class="px-6 py-4">
                        ₹{data?.fare}
                      </td>
                    )}
                    {data?.finished && (
                      <td class="px-6 py-4">
                        Paid
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="ml-4 mt-2 text-lg font-simibold text-red-500 text-center">
            No Scheduled Rides.. 
             
          </div>
        )}
      </>
    </div>
  );
};
