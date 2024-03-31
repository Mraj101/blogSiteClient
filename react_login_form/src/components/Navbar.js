import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogOut";
import Signup from "../pages/signup";
const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { usr, setUsr } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate()
  // console.log(usr, "+consoled user");

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
    // console.log("unmount");
  }, [prevScrollPos, visible]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      setUsr(stored);
    }
  }, []);


  //logout
  const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.log("eror loging out",error)
  }
  // window.location.reload();
  };
  

  return (
    <div
      className={`z-50 h-18 bg-white px-4  lg:px-8 py-4 shadow-lg sticky top-0 transition duration-500 ${
        visible ? "" : "transform -translate-y-full"
      }`}
    >
      <div className="flex lg:justify-between md:justify-between gap-5 items-center">
        <Link to="/">
          <div className=" font-bold text-2xl">Blogs</div>
        </Link>

        <div className="flex items-center space-x-4">
          {usr && (
            <Link to="/create">
              <button className="border-2 border-blue-300 rounded-md p-1 text-blue-400 hover:text-blue-600">
                Create Blog
              </button>
            </Link>
          )}

          {usr ? (
            ""
          ) : (
            <Link to="/login">
              <div>
                <button className=" font-semibold border border-gray-200 p-2 rounded-lg shadow-md">
                  Login
                </button>
              </div>
            </Link>
          )}

          {usr ? (
            ""
          ) : (
            <Link to="/signup">
              <div>
                <button className=" font-semibold border border-gray-200 p-2 rounded-lg shadow-md">
                  Sign up
                </button>
              </div>
            </Link>
          )}

          <Link to="userProfile">
            <div>
              {usr && (
                <img
                  className="h-10 w-10 shadow-lg border border-gray-300 rounded-full object-cover"
                  src={usr.img}
                  alt="no Image"
                />
              )}
            </div>
          </Link>

          {usr && (
            <button onClick={handleLogout} className="font-thin border border-gray-200 p-2 rounded-lg shadow-md">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
