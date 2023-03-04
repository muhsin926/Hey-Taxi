import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { blankProfile } from "../../assets";
import { setToDriverId } from "../../redux/slices/ChatSlice";

const Inbox = () => {
  const [chatInput, setChatInput] = useState("");
  const [chaters, setChaters] = useState([]);
  const [chater, setChater] = useState({});
  const [messages, setMasseges] = useState([]);
  const { toDriverId } = useSelector((state) => state.chatSlice);
  const { userId } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const [inbox, setInbox] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    socket.emit("send_msg", {
      to: toDriverId,
      msg: chatInput,
      senderType: "Passenger",
    });

    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/passenger/chat`,
      { chatInput, toDriverId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setChatInput("");
  };

  const getChater = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/passenger/getChater`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setChaters(data);
  };

  const getMsgs = async (id) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/passenger/chat?driverId=${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setMasseges(data);
  };

  const pickReceiver = (driver) => {
    dispatch(setToDriverId(driver._id));
    setChater(driver);
    getMsgs(driver._id);
    setInbox(true);
  };

  useEffect(() => {
    getChater();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-2 ">
      <div className="hidden sm:block col-span-8 h-[30rem] border border-zinc-400 rounded-lg ">
        <div className="w-full bg-black py-3 pl-5 rounded-t-lg">
          <div className="flex gap-3 items-center">
            <Link to={"#"}>
              <FontAwesomeIcon
                className="text-white text-2xl mr-4"
                icon={faCircleArrowLeft}
              />
            </Link>
            <img
              src={blankProfile}
              className=" w-10  rounded-full"
              alt="Profile photo"
            />
            <h1 className="text-lg text-white font-medium">{chater?.name}</h1>
          </div>
        </div>
        <div className="h-[22rem] overflow-y-auto">
          {messages?.map((msg) =>
            msg?.senderType == "Passenger" ? (
              <div className=" my-5 w-full flex justify-end">
                <h1 className=" bg-gradient-to-br from-cyan-400 to-cyan-800 text-white  p-3 mr-2 rounded-t-xl rounded-bl-xl ">
                  {msg.message}
                </h1>
              </div>
            ) : (
              <div className=" my-5 w-full flex justify-start">
                <h1 className="bg-gradient-to-bl from-yellow-400 to-orange-600 text-white p-3 ml-2 rounded-t-xl rounded-br-lg">
                  {msg.message}
                </h1>
              </div>
            )
          )}
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-12 px-5 gap-3">
            <div className="col-span-10 ">
              <input
                type="text"
                className="w-full border border-gray-400 rounded-lg pl-3 py-3"
                placeholder="Type here..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="bg-gradient-to-br hover:bg-gradient-to-tl from-green-400 to-green-900 text-white text-lg font-poppins font-semibold rounded-md py-2 w-full"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden sm:block col-span-4 h-[30rem] border border-zinc-400 rounded-lg  cursor-pointer">
        <div>
          {chaters?.map((chater) => (
            <div
              onClick={() => pickReceiver(chater)}
              className="mx-2 border-b border-gray-200 flex gap-3 items-center hover:bg-gray-200 p-3"
            >
              <img
                src={chater?.profile ? chater?.profile : blankProfile}
                className=" w-10  rounded-full"
                alt="Profile photo"
              />
              <h1 className="text-lg text-black font-medium">{chater?.name}</h1>
            </div>
          ))}
        </div>
      </div>

      {!inbox ? (
        <div className="block sm:hidden col-span-12 h-[30rem] border border-zinc-400 rounded-lg  cursor-pointer">
          <div className="w-full bg-black py-4 pl-8 text-xl  border-gray-200 rounded-t-lg text-white">
            Inbox
          </div>
          <div>
            {chaters?.map((chater) => (
              <div
                onClick={() => pickReceiver(chater)}
                className="cursor-pointer mx-2 border-b border-gray-200 flex gap-3 items-center hover:bg-gray-200 p-3"
              >
                <img
                  src={chater?.profile ? chater?.profile : blankProfile}
                  className=" w-10  rounded-full"
                  alt="Profile photo"
                />
                <h1 className="text-lg text-black font-medium">
                  {chater?.name}
                </h1>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="block sm:hidden col-span-12 h-[30rem] border border-zinc-400 rounded-lg ">
          <div className="w-full bg-black py-3 pl-5 rounded-t-lg">
            <div className="flex gap-3 items-center">
              <Link to={"#"} onClick={() => setInbox(false)}>
                <FontAwesomeIcon
                  className="text-white text-2xl mr-4"
                  icon={faCircleArrowLeft}
                />
              </Link>
              <img
                src={blankProfile}
                className=" w-10  rounded-full"
                alt="Profile photo"
              />
              <h1 className="text-lg text-white font-medium">{chater?.name}</h1>
            </div>
          </div>
          <div className="h-[22rem] overflow-y-auto">
            {messages?.map((msg) =>
              msg?.senderType == "Driver" ? (
                <div className=" my-5 w-full flex justify-end">
                  <h1 className=" bg-gradient-to-br from-cyan-400 to-cyan-800 p-3 mr-2 rounded-t-xl rounded-bl-xl ">
                    {msg.message}
                  </h1>
                </div>
              ) : (
                <div className=" my-5 w-full flex justify-start">
                  <h1 className="bg-gradient-to-bl from-orange-400 to-orange-700 p-3 ml-2 rounded-t-xl rounded-br-lg">
                    {msg.message}
                  </h1>
                </div>
              )
            )}
          </div>
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-12 px-5 gap-3">
              <div className="col-span-10 ">
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded-lg pl-3 py-3"
                  placeholder="Type here..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-gradient-to-br hover:bg-gradient-to-tl from-green-400 to-green-900 text-white text-centert text-base md:text-lg font-poppins py-3 font-meduim md:font-semibold rounded-md md:py-2 w-full"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Inbox;
