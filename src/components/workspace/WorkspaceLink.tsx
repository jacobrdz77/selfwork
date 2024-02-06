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
              </div>
              <div className="sidebar__workspace-link__name">
                {workspace?.name}
              </div>
              <div className="sidebar__tooltip">
                <span>{workspace?.name}</span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default WorkspaceLink;
