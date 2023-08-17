import useMenu from "@/hooks/useMenu";
import React from "react";
import { getFirstLetter, getInitials } from "../UI/UserCard";
import { useOneWorkspace, useWorkspaces } from "@/hooks/WorkspaceHooks";
import Link from "next/link";

const WorkspaceList = ({ isNavMinimized }: { isNavMinimized: boolean }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { workspace } = useOneWorkspace();
  const { workspaces } = useWorkspaces();
  return (
    <div className="workspace-list workspace-list__button-container">
      <button
        ref={btnRef}
        className={`menu-button workspace-list__button ${
          isNavMinimized ? "workspace-list__button--minimized" : ""
        }`}
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        <span>Workspaces</span>
        <div className="workspace-list__icon-container">
          <svg
            className="workspace-list__icon"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9998 0.940948C12.0037 0.757525 11.9523 0.577403 11.8526 0.425624C11.753 0.273844 11.61 0.157947 11.4437 0.0940481C11.2774 0.030149 11.096 0.021422 10.9247 0.0690802C10.7534 0.116738 10.6008 0.218413 10.4879 0.35997L6.0138 5.76116L1.54126 0.35997C1.47167 0.262048 1.38332 0.180041 1.28167 0.119084C1.18001 0.0581275 1.06725 0.0195343 0.950508 0.00572114C0.833763 -0.00809202 0.715543 0.00317275 0.603203 0.0388099C0.490863 0.074447 0.386814 0.133688 0.297637 0.212825C0.208461 0.291962 0.136123 0.389288 0.085001 0.49871C0.0338793 0.608131 0.00516605 0.727291 0.000636101 0.848725C-0.00389481 0.97016 0.0158014 1.09125 0.0586185 1.20442C0.101437 1.31759 0.166385 1.4204 0.2494 1.50641L5.36536 7.69028C5.44549 7.78739 5.54495 7.86537 5.65704 7.91884C5.76914 7.97231 5.89114 8 6.01459 8C6.13803 8 6.26004 7.97231 6.37213 7.91884C6.48422 7.86537 6.58378 7.78739 6.66391 7.69028L11.7848 1.50641C11.919 1.35019 11.995 1.14983 11.9998 0.940948Z"
              fill="white"
            />
          </svg>
        </div>
      </button>
      <div
        className={`menu workspace-list__menu ${isMenuOpen ? "active" : ""}`}
        ref={menuRef}
        onClick={(e) => {
          setIsMenuOpen(false);
        }}
      >
        <div className="workspace-list__current">
          <div className="text">Current Workspace</div>
          <Link href="/workspace">
            <div key={workspace?.id} className="workspace-link">
              <div className="workspace-link__logo">
                <div className="workspace-link__initial">
                  {getFirstLetter(workspace?.name ? workspace?.name : "")}
                </div>
                {/* <svg
          className="workspace-link__icon"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.7205 0.5H19.0807C23.4534 0.5 25.0435 0.895061 26.8323 1.88272C28.4224 2.67284 29.8137 4.05556 30.6087 5.6358C31.4037 7.21605 32 8.7963 32 13.3395V19.6605C32 24.0062 31.6025 25.5864 30.6087 27.3642C29.8137 28.9444 28.4224 30.3272 26.8323 31.1173C25.2422 31.9074 23.6522 32.5 19.0807 32.5H12.7205C8.34783 32.5 6.75776 32.1049 4.96894 31.1173C3.37888 30.3272 1.98758 28.9444 1.19255 27.3642C0.397515 25.3889 0 23.8086 0 19.463V13.142C0 8.7963 0.397515 7.21605 1.3913 5.43827C2.18634 3.85802 3.57764 2.47531 5.1677 1.68518C6.75776 0.895062 8.34783 0.5 12.7205 0.5Z" />
        </svg> */}
              </div>
              <div className="workspace-link__name">{workspace?.name!}</div>
            </div>
          </Link>
        </div>

        <div className="workspace-list__list">
          {/* Workspaces */}
          <div className="text">Your workspaces</div>
          {workspaces?.map((workspace) => (
            <div key={workspace.id} className="workspace-link">
              <div className="workspace-link__logo">
                <div className="workspace-link__initial">
                  {getFirstLetter(workspace?.name ? workspace?.name : "")}
                </div>
                {/* <svg
          className="workspace-link__icon"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.7205 0.5H19.0807C23.4534 0.5 25.0435 0.895061 26.8323 1.88272C28.4224 2.67284 29.8137 4.05556 30.6087 5.6358C31.4037 7.21605 32 8.7963 32 13.3395V19.6605C32 24.0062 31.6025 25.5864 30.6087 27.3642C29.8137 28.9444 28.4224 30.3272 26.8323 31.1173C25.2422 31.9074 23.6522 32.5 19.0807 32.5H12.7205C8.34783 32.5 6.75776 32.1049 4.96894 31.1173C3.37888 30.3272 1.98758 28.9444 1.19255 27.3642C0.397515 25.3889 0 23.8086 0 19.463V13.142C0 8.7963 0.397515 7.21605 1.3913 5.43827C2.18634 3.85802 3.57764 2.47531 5.1677 1.68518C6.75776 0.895062 8.34783 0.5 12.7205 0.5Z" />
        </svg> */}
              </div>
              <div className="workspace-link__name">{workspace?.name!}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceList;
