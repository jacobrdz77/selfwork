import Link from "next/link";
import React from "react";

const Avatar: React.FC<{ userImageURL: string; name: string }> = ({
  userImageURL,
  name,
}) => {
  return (
    <div className="flex mb-3 py-2.5 px-5 hover:bg-buttonHover rounded-[15px] bg-button">
      <img src={userImageURL} alt="image" />
      <Link href="/profile">Jacob Rodriguez</Link>
    </div>
  );
};

export default Avatar;
