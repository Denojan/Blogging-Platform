import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";



export default function UserPortal() {
  const { auth } = useAuth();
  const { user } = auth;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOptionClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const closeSidebarOnResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", closeSidebarOnResize);

    return () => {
      window.removeEventListener("resize", closeSidebarOnResize);
    };
  }, []);

  return (
    <>
   
      <nav className="bg-blue-900 border-gray-200 px-2 sm:px-4 py-2.5 fixed top-0 left-0 w-full h-20 z-20">
  <div className="container flex flex-wrap items-center justify-start mx-auto ">
    <div
      className="hidden w-full md:block md:w-auto ml-auto"
      id="navbar-default"
    >
      <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
        <li>
          <Link
            to="/user/allBlog"
            className="bg-[#ffffff] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-black text-[10px] block w-[150px] text-center mb-7 mx-0 md:mx-auto" // Adjusted mx-0 here
            onClick={handleOptionClick}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/user/myBlog"
            className="bg-[#ffffff] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-black text-[10px] block w-[150px] text-center mb-7 mx-auto"
            onClick={handleOptionClick}
          >
            My blog
          </Link>
        </li>
        <li>
          <Link
            to="/user/update"
            className="bg-[#ffffff] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-black text-[10px] block w-[150px] text-center mb-7 mx-auto"
            onClick={handleOptionClick}
          >
            My Details
          </Link>
        </li>
        <li>
          <Link
            to="/user/updatePass"
            className="bg-[#ffffff] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-black text-[10px] block w-[150px] text-center mb-7 mx-auto"
            onClick={handleOptionClick}
          >
            Update Password
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="block py-2 pl-3 pr-4  text-secondary rounded  hover:text-gray-800 md:bg-transparent md:p-0 "
            style={{ color: "#FFFFFF" }}
          >
            {user}
          </Link>
          <Link
            to="/"
            className="block py-2 pl-3 pr-4  text-secondary rounded  hover:text-gray-800 md:bg-transparent md:p-0 "
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>



      <Outlet />
    </>
  );
}
