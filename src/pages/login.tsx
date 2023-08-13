/* eslint-disable @next/next/no-img-element */
import UserAuthForm from "@/components/auth/UserAuthForm";
import { NextPage } from "next";
import React from "react";

const Login: NextPage = () => {
  return (
    <>
      <div className="app-example">
        <div className="logo">
          selfwork
          <span className="logo--dot">.</span>
        </div>

        <div className="headline">
          <h1>Project management + Whiteboarding in one workplace</h1>
        </div>
        <div className="image">
          <img
            src={"/assets/images/app-example.png"}
            alt="Example of using selfwork"
          />
        </div>
      </div>
      <UserAuthForm />
    </>
  );
};

export default Login;
