import useMenu from "@/hooks/useMenu";
import { getInitials } from "../UI/UserCard";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { useWorkspaces } from "@/hooks/WorkspaceHooks";

const UserSidebarCard = ({
  name,
  workspaceName,
}: {
  name: string;
  workspaceName: string;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { workspaces, status } = useWorkspaces(isMenuOpen);
  return (
    <>
      <div
        className="sidebar__user-container"
        role="button"
        ref={btnRef}
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        <div className="sidebar__user">
          <div className={`sidebar__user-icon`}>{getInitials(name)}</div>
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
            {status === "loading" && (
              <div className="sidebar__user-menu-item">
                <LoadingSkeleton isDark={true} />
              </div>
            )}
            {status === "success" &&
              workspaces?.map((workspace) => (
                <div
                  key={workspace.id}
                  className="sidebar__user-menu-item"
                  onClick={() =>
                    console.log("Opens a new page with different workspace")
                  }
                >
                  {workspace.name}
                </div>
              ))}

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
