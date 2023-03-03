import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { blankProfile } from "../../assets";
import axios from "axios";
import url from "../../api/Api";
import { toast } from "react-hot-toast";

const NewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading,setLoading] =useState(false)

  const getNewUsers = async () => {
    const { data } = await axios.get(`${url}/api/admin/getNewUsers`);
    setUsers(data);
  };

  const verify = async(driver) => {
    setLoading(true)
    await axios.patch(`${url}/api/admin/getNewUsers?id=${driver._id}`)
    setLoading(false)
    toast.success("Account verified")
  }

  useEffect(() => {
    getNewUsers();
  }, [loading]);
  return (
    <div className="grid grid-cols-12 gap-5 p-3">
      <div className="col-span-12 md:col-span-6 bg-gradient-to-l to-zinc-800 from-black  p-7 rounded-lg ">
        <div>
          <div>
            <h1 className="text-xl mb-4">New Users</h1>
          </div>
          {users[0]?.map((user) => (
            <div className="flex items-center gap-2 hover:bg-zinc-800 border-b rounded-md p-2 border-zinc-800 py-2">
              <CheckIcon
                className="block  w-7 text-green-500"
                aria-hidden="true"
              />
              <img
                src={user?.profile ? user?.profile : blankProfile}
                className="w-8  rounded-full"
                alt="Profile photo"
              />
              <h1>{user.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 md:col-span-6  bg-gradient-to-r from-black  p-7 rounded-lg ">
        <div>
          <div>
            <h1 className="text-xl mb-4">New Drivers</h1>
          </div>
          {users[1]?.map((user) => (
            <div className="flex  items-center gap-2 hover:bg-zinc-800 border-b rounded-md p-2 border-zinc-800 py-2">
              {user.verify ? (
                <CheckIcon
                  className="block  w-7 text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <ExclamationTriangleIcon
                  className="block  w-8 text-red-500"
                  aria-hidden="true"
                />
              )}
              <img
                src={user?.profile ? user?.profile : blankProfile}
                className="w-8  rounded-full"
                alt="Profile photo"
              />
              <h1>{user.name}</h1>
              {!user.verify && (
                <div className="w-full text-end">
                  <button 
                  onClick={()=> verify(user)}
                  className="cursor-pointer bg-gradient-to-r from-green-500 to-green-900 rounded-md text-sm  ">
                    Verify Account
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewUsers;
