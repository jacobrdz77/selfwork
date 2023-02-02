import useUserColor from "@/hooks/useUserColor";
import { UserColor } from "@/types/types";
import useMenu from "@/hooks/useMenu";
import { getInitials } from "./UserCard";

const UserSidebarCard = ({
  name,
  workspaceName,
  iconColor,
}: {
  name: string;
  workspaceName: string;
  iconColor: UserColor;
}) => {
  const color = useUserColor(iconColor);
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  return (
    <>
      <div
        className="sidebar__user-container"
        role="button"
        ref={btnRef}
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        <div className="sidebar__user">
          <div className={`sidebar__user-icon sidebar__user-icon--${color}`}>
            {getInitials(name)}
          </div>
          <span className="sidebar__user-name">{name}</span>
          <div className="sidebar__tooltip">
            <span>{name}</span>
            <span>{workspaceName}</span>
          </div>
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
            {/* Render all of user's workspaces*/}
            <div
              className="sidebar__user-menu-item"
              onClick={() => console.log("Add task modal opens")}
            >
              Workspaces
            </div>
            <div
              className="sidebar__user-menu-item"
              onClick={() => {
                console.log("Create workspace modal opens");
              }}
            >
              Create New Workspace
            </div>
          </div>
          <div className="sidebar__user-menu-section">
            {/* Opens model of user's editable data */}
            <div
              className="sidebar__user-menu-item"
              onClick={() => console.log("CLICK")}
            >
              My Profile
            </div>
            <div
              className="sidebar__user-menu-item"
              onClick={() => console.log("CLICK")}
            >
              Log Out
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebarCard;
