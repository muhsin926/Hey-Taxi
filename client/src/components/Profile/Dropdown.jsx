import { useState } from "react";
import { Link } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentList, setCurrentList] = useState("Profile Setting");
  const dropList = [
    { id: 1, name: "Profile Setting", href: "/profile" },
    { id: 1, name: "Scheduled Rides", href: "/scheduled-rides" },
    { id: 1, name: "Rides History", href: "/ride-history" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (list) => {
    setIsOpen(false);
    setCurrentList(list);
  };

  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="focus:ring-2 flex justify-between focus:ring-gray-400 border-gray-200 border w-full font-poppins font-medium rounded-lg text-sm px-4 py-2.5 text-center  items-center"
        type="button"
        onClick={toggleDropdown}
      >
        {currentList}
        <svg
          className="w-4 h-4 ml-2 "
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className={`z-10 ${
          isOpen ? "" : "hidden"
        } absolute bg-white divide-y divide-gray-100 rounded-lg shadow mt-3 w-full`}
      >
        <ul
          className="py-2 text-sm text-black "
          aria-labelledby="dropdownDefaultButton"
        >
          {dropList.map((list) => (
            <li key={list.id} onClick={() => handleClick(list.name)}>
              <Link
                to={list.href}
                className="block px-4 py-2 hover:bg-gray-100 "
              >
                {list.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Dropdown;
