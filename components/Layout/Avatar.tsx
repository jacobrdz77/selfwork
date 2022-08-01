import React from "react";

const Avatar: React.FC<{ userName: string }> = ({ userName }) => {
  const str = userName.split(" ");
  const firstLetter = str[0][0];
  const secondLetter = str[1][0];
  const avatar = firstLetter + secondLetter;

  return (
    <div className="flex justify-around items-center rounded-full h-[40px] w-[40px] tracking-wider text-[20px] bg-green-500">
      {avatar}
    </div>
  );
};

export default Avatar;
