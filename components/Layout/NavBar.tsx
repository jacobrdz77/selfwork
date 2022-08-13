import React from "react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "./Avatar";
const NavBar: React.FC = () => {
  return (
    <nav className=" maxsm:hidden grow-0 sticky top-0 left-0 w-[208px] h-screen m-0 text-center bg-primary  text-white">
      <div>
        {/* LOGO */}
        <div className="mt-4 mb-5 mx-auto text-[30px]">
          selfwork<span className="text-green-400">.</span>
        </div>
        {/* Buttons */}
        <div className="mt-0 w-full text-[16px]">
          <div className="w-[164px] h-full flex flex-col mx-auto gap-3 ">
            <Link href="/tasks">
              <a className="mb-3 py-2.5 px-5 hover:bg-buttonHover rounded-[15px] bg-button">
                <div className="flex justify-start items-center w-full ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check-circle"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="inline pl-3">Tasks</span>
                </div>
              </a>
            </Link>
            <Link href="/projects">
              <a className="bg-button mb-3 py-2.5 px-5 hover:bg-buttonHover rounded-[15px]">
                <div className="flex justify-start items-center w-full ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-2 -4 24 24"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M17 4H9.415l-.471-1.334A1.001 1.001 0 0 0 8 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-6.17-2H17a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h5c1.306 0 2.417.835 2.83 2z"></path>
                  </svg>
                  <div className="inline pl-3">Projects</div>
                </div>
              </a>
            </Link>
            <Link href="/clients">
              <a className="bg-button mb-3 py-2.5 px-5 hover:bg-buttonHover rounded-[15px]">
                <div className="flex justify-items-center items-center w-full ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <div className="inline pl-3">Clients</div>
                </div>
              </a>
            </Link>
          </div>
        </div>
        {/* User Profile */}
        <div className="w-full mt-9">
          <div className="w-[164px] flex items-center justify-start mx-auto">
            <Avatar userName={"Jacob Rodriguez"} />
            <Link href="/profile">
              <a className="ml-3 hover:underline">View Profile</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
{
  /* <Image src="/public/logo.png" alt="selfwork" width={500} height={500} /> */
}
