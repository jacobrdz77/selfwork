import { useWorkspaceMembers } from "@/hooks/WorkspaceHooks";
import { User } from "@prisma/client";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import LoadingSkeleton from "../UI/LoadingSkeleton";

const AssigneeMenu = ({
  assigneeMenuRef,
  setIsAssigneeMenuOpen,
  isAssigneeMenuOpen,
  setAssignee,
}: {
  assigneeMenuRef: MutableRefObject<null>;
  setIsAssigneeMenuOpen: Dispatch<SetStateAction<boolean>>;
  isAssigneeMenuOpen: boolean;
  setAssignee: Dispatch<SetStateAction<User | null>>;
}) => {
  const { members, status } = useWorkspaceMembers();
  console.log("members", members);

  return (
    <div
      className={`assignee-menu ${
        isAssigneeMenuOpen ? "assignee-menu--active" : ""
      }`}
      ref={assigneeMenuRef}
    >
      {status === "loading" && (
        <div className="assignee-menu__skeleton">
          <LoadingSkeleton isDark={true} />
        </div>
      )}
      {status === "success" &&
        members!.map((member) => (
          <div
            key={member.id}
            className="assignee-menu__item"
            onClick={() => {
              setIsAssigneeMenuOpen(!isAssigneeMenuOpen);
              setAssignee(member);
            }}
          >
            {member.name}
          </div>
        ))}
    </div>
  );
};

export default AssigneeMenu;
