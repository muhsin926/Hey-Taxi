import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { blankProfile, logo1 } from "../../assets";
import { Link } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";
import { useSelector } from "react-redux";
import axios from "axios";
import url from '../../api/Api'
import NotificationModal from "./NotificationModal";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Ride", href: "/ride", current: false },
  { name: "Drive", href: "#", current: false },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const handleSignOut = () => {
  localStorage.removeItem("token");
  window.location.reload()
};

export default function Navbar() {
  const [notification, setNotification] = useState([])
  const [showModal,setShowModal] = useState(false)
  const [details, setDetails] = useState()
  const { socket } = useSelector((state) => state.socket)
  const auth = useAuth()

  const getNotification = async () => {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${url}/api/passenger/ride-request`,{
      headers: { Authorization: `Bearer ${token}` }
    })
    setNotification(data.requests)
  }

  useEffect(() => {
    getNotification()
  }, [])

  const showDetails = (details) => {
    setDetails(details)
    setShowModal(true)
  }

  useEffect(() => {
    socket && socket.on("ride-accept", (data) => {
      console.log(data);
      setNotification(data)
    })
  }, [socket])

  return (
    <Disclosure as="nav" className="bg-black ">
      {({ open }) => (
        <>
        {showModal && <NotificationModal setShowModal={setShowModal} details={details} />}
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-5 md:h-6 w-auto "
                  src={logo1}
                  alt="Hey taxi logo"
                />
              </div>
              <div className="flex flex-1 items-center justify-end sm:items-stretch ">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {auth ? (
                <div className="absolute  inset-y-0 right-8 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="relative ml-3 ">
                    <div>
                      <Menu.Button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">View notifications</span>
                        {notification.length > 0 && <div className="bg-red-500 w-4 h-4 rounded-full absolute text-white text-center text-xs left-5 top-5">{notification.length}</div>}
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
                                {notification.length > 0 ? (
                                <div className="flex py-3 border-b border-gray-100">
                                  <img className="w-14 h-14 rounded-full" src={blankProfile} alt="profile" />
                                  <div className="flex justify-between">
                                    <div className="flex flex-col">
                                      <h1 className="text-lg ml-1 font-medium">{noti.receiver?.name}</h1>
                                      <div className="ml-1 flex ">
                                        <h1>Accepted your {noti.destination.split(',')[0]} ride</h1>
                                      </div>
                                    </div>
                                    <div className="flex  items-center">
                                      <button onClick={() => showDetails(noti)} className="cursor-pointer rounded hover:bg-green-500 font-semibold  px-3 text-base bg-green-400 text-white py-1 ml-4">Show</button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="">No Notifications</div>
                              )}
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
                            <Link
                              to={'/profile'}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
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
              ) : (
                <Link
                  to={'/login'}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sign In</Link>
              )}
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
      )
      }
    </Disclosure >
  );
}

