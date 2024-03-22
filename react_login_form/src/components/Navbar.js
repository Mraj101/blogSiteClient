import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogOut";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { usr, setUsr } = useAuthContext();
  const { logout } = useLogout();
  console.log(usr, "+consoled user");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      let isVisible = prevScrollPos > currentScrollPos;
      // console.log(prevScrollPos,"pos")
      if (prevScrollPos < 40) isVisible = true;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
      // console.log(visible,"hi");
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    console.log("unmount");
  }, [prevScrollPos, visible]);

  
  useEffect(() => {
    if (localStorage.getItem("user", JSON.parse(usr))) {
      const locaStoredUser = localStorage.getItem("user", JSON.parse(usr));
      // console.log(locaStoredUser,"stored user")
      setUsr(locaStoredUser);
    }
  }, []);


  //logout
  const handleLogout= async()=>{
    await logout()
  }

  return (
    <div
      className={`z-50 h-20 bg-white x-4 sm:px-6 lg:px-8 py-4 shadow-lg sticky top-0 transition duration-500 ${
        visible ? "" : "transform -translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <Link to="/" className=" font-bold text-2xl">
            Blogs
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/create">
            <button className="border-2 border-blue-300 rounded-md p-1 text-blue-400">
              Create Blog
            </button>
          </Link>
          <div>
            <button className=" font-thin">Sing In</button>
          </div>
          <Link to="userProfile">
          <div>
            <img
              className="h-10 w-10 shadow-lg border border-gray-300 rounded-full object-contain"
              src="https://xsgames.co/randomusers/assets/avatars/male/63.jpg"
              alt="no Image"
            />
          </div>
          </Link>
         
          <button onClick={handleLogout} className="font-thin">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
