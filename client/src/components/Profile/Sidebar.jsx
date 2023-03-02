import React from 'react'
import Button from './Button';


const navigation = [
  { name: "Profile Setting", href: "/profile",},
  { name: "Scheduled Rides", href: "/scheduled-rides",},
  { name: "Rides History", href: "/ride-history",},
  { name: "Chat Inbox", href: "/inbox",},
];
const Sidbar = () => {
  return (
    <div>
    {navigation.map((data) => (
      <Button
        style={
          "rounded-md p-2 w-full text-base text-start text-gray-500 font-medium hover:bg-slate-200 hover:text-black "
        }
        title={data.name}
        bg={
          location.pathname == data.href &&
          "text-black rounded-md p-2 w-full text-start font-semibold hover:bg-slate-200 text-base font-medium "
        }
        onclick={data.href}
        key={data.name}
      />
    ))}
  </div>
  )
}

export default Sidbar