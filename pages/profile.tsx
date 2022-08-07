import React, { useState } from "react";
import Header from "../components/UI/Header";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" py-5 px-7">
      <Header
        button={true}
        title="Username"
        buttonText="Edit"
        buttonHandler={() => setIsModalOpen(true)}
      ></Header>
      <section></section>
    </div>
  );
};

export default ProfilePage;
