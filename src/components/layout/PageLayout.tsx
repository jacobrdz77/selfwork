import React, { ReactNode } from "react";
import { useModalStore, userStore } from "store/user";
import AddProjectModal from "../project/AddProjectModal";
import AddTaskPopup from "../task/AddTaskPopup";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";
import AddClientModal from "../client/AddClientModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PageLayout: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;
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

  const session = useSession();
  const { workspaceId, workspaceName } = userStore.getState();

  return (
    <div className="layout">
      <NavBar />
      <main
        className={`main ${
          currentPath.slice(0, 7) === "/sketch" ? "main--dark" : ""
        }`}
      >
        {children}
      </main>
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
