import { useUserInfo } from "@/hooks/MemberHooks";
import useMenu from "@/hooks/useMenu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { getInitials } from "../UI/UserCard";

const UserSidebarCard = () => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  // const userId = useUserStore((state) => state.userId);
  const { user, status } = useUserInfo("al814zcy86074hloymogrg1mv");
  const router = useRouter();
  const session = useSession();

  return (
    <>
      {status === "success" ? (
        <div
          className="sidebar__user-container"
          role="button"
          ref={btnRef}
          onClick={() => setIsMenuOpen((state) => !state)}
        >
          <div className="sidebar__user">
            {session.data?.user ? (
              <img
                className="sidebar__user-provider-image"
                src={session.data?.user.image!}
                alt="user provider image"
              />
            ) : (
              <div className={`sidebar__user-icon`}>
                {session.status === "authenticated"
                  ? getInitials(session.data?.user?.name as string)
                  : getInitials("Sample User")}
              </div>
            )}

            <span className="sidebar__user-name">
              {session.status === "authenticated"
                ? session.data?.user?.name
                : "Sample User"}
            </span>
          </div>
          <div
            className={`sidebar__user-menu ${
              isMenuOpen ? "project-card__edit-menu--active" : ""
            }`}
            ref={menuRef}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div className="sidebar__user-menu-section">
              {/* Opens model of user's editable data */}
              <div
                onClick={() => {
                  router.push(`/profile/${user.id}`);
                }}
                className="sidebar__user-menu-item"
              >
                <span>My Profile</span>
              </div>
              <div
                className="sidebar__user-menu-item"
                onClick={async () => {
                  console.log("LOG OUT");
                  signOut({
                    callbackUrl: "/login",
                  });
                }}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sidebar__add-container">
          <LoadingSkeleton
            className="sidebar__nav-link-loading sidebar__nav-link-loading--user"
            isDark={true}
          />
        </div>
      )}
    </>
  );
};

export default UserSidebarCard;
