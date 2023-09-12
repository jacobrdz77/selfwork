import React from "react";

import { useOneWorkspace } from "@/hooks/WorkspaceHooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { getFirstLetter } from "@/utils/user";

const WorkspaceLink = () => {
  const { workspace, status } = useOneWorkspace();
  const router = useRouter();

  return (
    <>
      {status === "success" && (
        <Link href="/workspace">
          <div className={`sidebar__workspace-link-container `}>
            <div
              className={`sidebar__workspace-link ${
                router.pathname === "/workspace" ? "sidebar__link--active" : ""
              }`}
            >
              <div className="sidebar__workspace-link__logo">
                <div className="sidebar__workspace-link__initial">
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
              <div className="sidebar__workspace-link__name">
                {status === "success" ? workspace?.name! : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default WorkspaceLink;
