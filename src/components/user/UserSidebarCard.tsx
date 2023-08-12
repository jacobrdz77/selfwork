import useMenu from "@/hooks/useMenu";
import { getInitials } from "../UI/UserCard";
import { useUserInfo } from "@/hooks/MemberHooks";
import { useUserStore } from "store/user";
import { useRouter } from "next/router";

const UserSidebarCard = () => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const userId = useUserStore((state) => state.userId);
  const { user, status: userStatus } = useUserInfo(userId);
  const router = useRouter();

  return (
    <>
      {userStatus === "success" ? (
        <div
          className="sidebar__user-container"
          role="button"
          ref={btnRef}
          onClick={() => setIsMenuOpen((state) => !state)}
        >
          <div className="sidebar__user">
            <div className={`sidebar__user-icon`}>
              {getInitials(user?.name as string)}
            </div>
            <span className="sidebar__user-name">{user?.name}</span>
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
                  router.push(`/profile/${userId}`);
                }}
                className="sidebar__user-menu-item"
              >
                <span>My Profile</span>
              </div>
              <div
                className="sidebar__user-menu-item"
                onClick={() => {
                  console.log("LOG OUT");
                  router.push("/push");
                }}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserSidebarCard;
