import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";

const Avatar: React.FC<{ name: string }> = ({ name }) => {
  // const getInitials = () => {
  //   const fullName = name.split(" ");
  //   if (name === undefined) return;
  //   const firstName = fullName[0];
  //   const lastName = fullName[1];
  //   return `${firstName[0]}${lastName[0]}`;
  // };
  return (
    <div className="flex justify-center mb-3 py-2.5 px-5 hover:bg-buttonHover rounded-[15px] bg-button hover:cursor-pointer">
      {/* <span className="w-[38px] h-[35px] flex justify-center items-center rounded-full bg-red-500 self-center">
        {getInitials()}
      </span> */}
      <Link href="/profile">
        <div className="flex align-middle">
          <p className="font-bold">{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Avatar;
