import React from "react";
import { getInitials } from "../UI/UserCard";
import { useSession } from "next-auth/react";

const ProfileInfo = ({
  email,
  name,
  phone,
  setIsModalOpen,
}: {
  name: string;
  email?: string;
  phone?: string;
  setIsModalOpen: (bool: boolean) => void;
}) => {
  const session = useSession();

  return (
    <div className="profile">
      <div className="profile__info">
        <div className="flex">
          {session.data?.user?.image ? (
            <img className="profile__image" src={session.data?.user?.image!} alt="profile image" />
          ) : (
            <div className="profile__avatar">
              <span>{getInitials(name)}</span>
            </div>
          )}

          <div className="text">
            <div className="profile__name">{name}</div>
            <div>
              {email ? (
                <a
                  href={"mailto:" + email}
                  target="__blank"
                  className="profile__contact"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="icon"
                  >
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {email}
                </a>
              ) : null}

              {phone ? (
                <a href={"tel:+" + phone} className="profile__contact">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="icon"
                  >
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {phone}
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="profile__edit-btn button"
          >
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
