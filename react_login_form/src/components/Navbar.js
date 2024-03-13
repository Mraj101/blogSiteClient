import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className=" bg-gray-800 flex content-center items-center px-4 h-[82px]">
      <div className="flex justify-between w-full">
        <div>
          <div className="text-white font-bold text-2xl ">BLogs</div>
        </div>
        <div className="mx-8" >
          <button className="text-white mr-4">Home</button>
          <Link to="/create">
          <button className="text-white mr-4">Create Blog </button>
          </Link>
          
          <button className="text-white mr-4">Profile
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 bg-red-300 rounded-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          </button>
          <button className="text-white">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
