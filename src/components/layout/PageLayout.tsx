import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { useModalStore, userStore } from "store/user";
import AddClientModal from "../client/AddClientModal";
import InviteMemberPopup from "../member/InviteMemberPopup";
import AddProjectModal from "../project/AddProjectModal";
import AddTaskPopup from "../task/AddTaskPopup";
import NavBar from "./NavBar";

const PageLayout: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const isAddTaskOpen = useModalStore((state) => state.isAddTaskOpen);
  const setIsAddTaskOpen = useModalStore((state) => state.setIsAddTaskOpen);
  const isAddProjectModalOpen = useModalStore(
    (state) => state.isAddProjectModalOpen
  );
  const setIsAddProjectModalOpen = useModalStore(
    (state) => state.setIsAddProjectModalOpen
  );
  const isClientModalOpen = useModalStore((state) => state.isClientModalOpen);
  const setIsClientModalOpen = useModalStore(
    (state) => state.setIsClientModalOpen
  );
  const isInviteMemberModalOpen = useModalStore(
    (state) => state.isInviteMemberModalOpen
  );
  const setIsInviteMemberModalOpen = useModalStore(
    (state) => state.setIsInviteMemberModalOpen
  );

  // const session = useSession();
  const { workspaceId, workspaceName } = userStore.getState();

  return (
    <div className="layout">
      <NavBar />
      <main className="main">{children}</main>
      {isAddTaskOpen && (
        <AddTaskPopup isOpen={isAddTaskOpen} setIsOpen={setIsAddTaskOpen} />
      )}
      {isAddProjectModalOpen && (
        <AddProjectModal
          isOpen={isAddProjectModalOpen}
          setIsModalOpen={setIsAddProjectModalOpen}
        />
      )}
      {isClientModalOpen && (
        <AddClientModal
          isOpen={isClientModalOpen}
          setIsModalOpen={setIsClientModalOpen}
        />
      )}

      {isInviteMemberModalOpen && (
        <InviteMemberPopup
          isOpen={isInviteMemberModalOpen}
          setIsOpen={setIsInviteMemberModalOpen}
          workspaceId={workspaceId}
          workspaceName={workspaceName}
        />
      )}

      {/* <AddClientModal
        isOpen={isClientModalOpen}
        setIsModalOpen={setIsClientModalOpen}
      /> */}
      {/* {isTaskDetailOpen && (
        <EditTaskModal
          taskId={taskId}
          isOpen={isTaskDetailOpen!}
          setIsModalOpen={setIsTaskDetailOpen}
        />
      )} */}

      <Toaster
        position="bottom-left"
        toastOptions={{
          className: "toast",
          duration: 4000,
          style: {
            color: "#fff",
            fontSize: "1.4rem",
          },
        }}
      />
    </div>
  );
};

export default PageLayout;
