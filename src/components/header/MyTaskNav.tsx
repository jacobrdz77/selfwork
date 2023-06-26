import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const MyTaskNav = () => {
  const router = useRouter();
  const currentPath = router.pathname.split("/")[2];
  console.log(currentPath);

  return (
    <nav>
      <ul className="project-header__nav">
        <li>
          <Link
            href={`/my-tasks/list`}
            className={`project-header__nav-link ${
              currentPath === "list" ? "project-header__nav-link--active" : ""
            }`}
          >
            List
          </Link>
        </li>
        <li>
          <Link
            href={`/my-tasks/board`}
            className={`project-header__nav-link ${
              currentPath === "board" ? "project-header__nav-link--active" : ""
            }`}
          >
            Board
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MyTaskNav;
