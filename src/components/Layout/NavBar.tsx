import React, { useState } from "react";
import Link from "next/link";
import Avatar from "./Avatar";
import { signOut } from "next-auth/react";

const NavBar: React.FC = () => {
  // const { data: user } = trpc.user.getUser.useQuery(
  //   {
  //     userId: "cl9uuyhd60002gpwnl6mz7k61",
  //   },
  //   {
  //     onSuccess: (user) => {
  //       setName(upperCaseName(user?.name!));
  //     },
  //   }
  // );
  const [name, setName] = useState("");

  return (
    <nav className="navigation">
      {/* LOGO */}
      <div className="navigation__logo">
        selfwork<span className="navigation__logo--dot">.</span>
      </div>
      {/* Buttons */}
      <ul className="navigation__list">
        <li>
          <Link className="navigation__link" href="/tasks">
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
            <span>Tasks</span>
          </Link>
        </li>
        <li>
          <Link className="navigation__link" href="/projects">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -4 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M17 4H9.415l-.471-1.334A1.001 1.001 0 0 0 8 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-6.17-2H17a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h5c1.306 0 2.417.835 2.83 2z"></path>
            </svg>
            <span>Projects</span>
          </Link>
        </li>
        <li>
          <Link className="navigation__link" href="/clients">
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
            <span>Clients</span>
          </Link>
        </li>
      </ul>
      {/* User Profile
        <div className="w-full flex justify-center">
          <div className="w-[190px] mt-9">
            <Avatar name={name} />
          </div>
        </div> */}

      <button className="navigation__logout" onClick={() => signOut()}>
        <div className="navigation__logout-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#fff"
              stroke="none"
            >
              <path
                d="M980 5105 c-324 -66 -577 -322 -636 -645 -20 -110 -20 -3689 0 -3800
30 -166 112 -316 239 -437 123 -116 265 -187 427 -212 55 -9 396 -11 1266 -9
l1191 3 49 30 c30 19 60 49 79 79 27 44 30 58 30 126 0 68 -3 82 -30 126 -19
30 -49 60 -79 79 l-49 30 -1211 5 -1211 5 -52 27 c-70 37 -120 89 -152 157
l-26 56 0 1835 0 1835 26 56 c32 68 82 120 152 157 l52 27 1211 5 1211 5 49
30 c30 19 60 49 79 79 27 44 30 58 30 126 0 68 -3 82 -30 126 -19 30 -49 60
-79 79 l-49 30 -1211 2 c-967 1 -1224 -1 -1276 -12z"
              />
              <path
                d="M3304 3916 c-88 -41 -134 -118 -134 -222 1 -94 15 -113 418 -516
l376 -378 -958 0 c-724 0 -969 -3 -1000 -12 -86 -26 -166 -136 -166 -228 0
-92 80 -202 166 -228 31 -9 276 -12 1000 -12 l958 0 -376 -377 c-206 -208
-384 -394 -394 -413 -13 -25 -18 -57 -19 -111 0 -67 3 -81 30 -124 56 -91 166
-133 272 -105 45 12 90 54 656 619 356 354 617 623 630 646 30 55 29 155 0
210 -13 23 -276 293 -630 647 -657 655 -625 628 -733 628 -26 0 -66 -10 -96
-24z"
              />
            </g>
          </svg>
        </div>
        <span className="navigation__logout-text">Sign out</span>
      </button>
    </nav>
  );
};

export default NavBar;
