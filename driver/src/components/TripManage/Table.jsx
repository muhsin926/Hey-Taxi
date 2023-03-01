import React from "react";
import { blankProfile } from "../../assets";
import dateFormat, { masks } from "dateformat";

export const Table = ({ row }) => {
  return (
    <div>
      <>
        {row.length > 0 ? (
          <div class="relative overflow-x-auto bg-black rounded-xl text-white">
            <table class="w-full text-sm text-left">
              <thead class="text-xs uppercase">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Passenger
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Pickup Location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Drop Off Location
                  </th>
                  {row[0].finished && (
                    <th scope="col" class="px-6 py-3">
                      Earned
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {row.map((data) => (
                  <tr
                    class="text-black border-b hover:bg-gray-200 bg-gray-100"
                    key={data._id}
                  >
                    <td class="px-6 py-4 flex items-center">
                      <img
                        src={blankProfile}
                        className="w-10 rounded-full mr-2 "
                        alt="profile"
                      />
                      {data.sender?.name}
                    </td>
                    {data?.finished ? (
                      <td class="px-6 py-4">
                        {dateFormat(data?.createdAt, "mmm d, yyyy")}
                      </td>
                    ) : (
                      <td class="px-6 py-4">
                        {dateFormat(data?.updatedAt, "mmm d, yyyy")}
                      </td>
                    )}
                    <td class="px-6 py-4">{data?.pickupLocation}</td>
                    <td class="px-6 py-4">{data?.destination}</td>
                    {data?.finished && (
                      <td class="px-6 py-4">
                        ₹{Math.floor((data?.fare * 80) / 100)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="ml-4 mt-2 text-lg font-simibold text-red-500 text-center">
            There is no ride..
          </div>
        )}
      </>
    </div>
  );
};
