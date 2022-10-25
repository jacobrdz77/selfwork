import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Header from "../components/UI/Header";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { data: session } = useSession();

  return (
    <div className=" py-5 px-7">
      <Header
        isButton={true}
        title={"User name"}
        buttonText="Edit"
        buttonHandler={() => setIsModalOpen(true)}
      ></Header>
      <section></section>
    </div>
  );
};

export default ProfilePage;
