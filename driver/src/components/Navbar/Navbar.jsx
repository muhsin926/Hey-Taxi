import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { blankProfile, logo1 } from "../../assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import url from '../../api/Api'


const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Vehicles", href: "/vehicles", current: false },
  { name: "Inbox", href: "#", current: false },
  { name: "Earnings", href: "#", current: false },
  { name: "Trip Management", href: "#", current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const handleSignOut = () => {
  localStorage.removeItem("token");
};

export default function Navbar() {
  const [notification, setNotification] = useState([])
  const { socket } = useSelector((state) => state.socket)

  const getNotification = async () => {
    const { data } = await axios.get(`${url}/api/driver/requests`)
    setNotification(data.requests)
  }

  useEffect(() => {
    getNotification()
  }, [])

  useEffect(() => {
    socket && socket.on("send-request", (data) => {
      console.log(data);
      setNoti([...noti, data])

    })
  }, [socket])

  const socketCall = () => {
    socket.emit("send-request", {
      pickup: "pattambi",
      droppoff: "calicut",
      user_name: "Passenger",
      profile: "image"
    })
  }
  return (
    <Disclosure as="nav" className="bg-black ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-5 md:h-6 w-auto "
                  src={logo1}
                  alt="Hey taxi logo"
                />
              </div>
              <div className="absolute  inset-y-0 right-8 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3 ">
                  <div>
                    <Menu.Button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {notification.map((noti) => (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={'#'}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              <div className="flex py-3 border-b border-gray-100">
                                <img className="w-14 h-14 rounded-full" src={blankProfile} alt="profile" />
                                <div className="flex justify-between">
                                  <div className="flex flex-col">
                                    <h1 className="text-lg ml-1 font-medium">{noti.sender.name}</h1>
                                    <div className="mx-2 flex ">
                                      <h1>{noti.pickupLocation.split(',')[0]}</h1>
                                      <h1 className="mx-3">to</h1>
                                      <h1>{noti.destination.split(',')[0]}</h1>
                                    </div>
                                  </div>
                                  <div className="flex  items-center">
                                    <button onClick={() => socketCall()} className="rounded  font-semibold  px-3 text-base bg-green-400 text-white py-1 ml-4">Accept</button>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}

                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 ">
                  <div>
                    <Menu.Button className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <h1
                            onClick={handleSignOut}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </h1>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
