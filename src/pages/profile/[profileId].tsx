import EditUserModal from "@/components/member/EditUserModal";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { AssigneeButton } from "@/components/task/BoardTask";
import { useUserInfo } from "@/hooks/MemberHooks";
import { useColor } from "@/hooks/useColor";
import { Project, Task } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useModalStore } from "store/user";

const ProfilePage = () => {
  const router = useRouter();
  const { user, status } = useUserInfo("al814zcy86074hloymogrg1mv");
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const isAddTaskOpen = useModalStore((state) => state.isAddTaskOpen);
  const setIsAddTaskOpen = useModalStore((state) => state.setIsAddTaskOpen);
  const isAddProjectModalOpen = useModalStore(
    (state) => state.isAddProjectModalOpen
  );
  const setIsAddProjectModalOpen = useModalStore(
    (state) => state.setIsAddProjectModalOpen
  );
  const [isSelf, setIsSelf] = useState(false);

  useEffect(() => {
    if (router.query.profileId === user?.id) {
      setIsSelf(true);
    }
  }, [user?.id, router.query.projectId, router.query.profileId]);

  return (
    <>
      {/* Edit user MODAL */}
      {isEditUserOpen && (
        <EditUserModal
          userId={user?.id!}
          initialEmail={user?.email!}
          initialName={user?.name!}
          initialPhone={""}
          isOpen={isEditUserOpen}
          setIsOpen={setIsEditUserOpen}
        />
      )}

      {/* PAGE */}
      <div className="page profile-page">
        {status === "loading" && "Loading..."}
        {status === "success" && (
          <ProfileInfo
            name={user?.name!}
            email={user?.email!}
            phone={user?.mobilePhone!}
            setIsModalOpen={setIsEditUserOpen}
          />
        )}

        <div className="data-layout">
          {/* <div className=" card">
            <h3>Tasks</h3>
            <div className="tasks">
              {user?.assignedTasks.map((task) => (
                <UserProfileTask key={task.id} task={task} />
              ))}

              {isSelf && user?.assignedTasks.length === 0 ? (
                <div className="no-tasks">
                  <div>
                    <p>You have no tasks. Create one!</p>
                    <button
                      className="button"
                      onClick={() => {
                        setIsAddTaskOpen(true);
                      }}
                    >
                      Create task
                    </button>
                  </div>
                </div>
              ) : null}

              {!isSelf && user?.assignedTasks.length === 0 ? (
                <div className="no-tasks">
                  <div>
                    <p>See {user.name + "'s"} tasks.</p>
                    <button
                      className="button"
                      onClick={() => {
                        setIsAddTaskOpen(true);
                      }}
                    >
                      Assign task
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div> */}
          <div className="card">
            <h3>Projects</h3>
            <div className="projects">
              {status === "success" &&
              user?.involvedProjects &&
              user.involvedProjects.length === 0 ? (
                <div className="no-tasks">
                  <div>
                    <p>You have no projects Create one!</p>
                    <button
                      className="button"
                      onClick={() => {
                        setIsAddProjectModalOpen(true);
                      }}
                    >
                      Create project
                    </button>
                  </div>
                </div>
              ) : (
                user?.involvedProjects &&
                user?.involvedProjects.map((project) => (
                  <UserProfileProject key={project.id} project={project} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

const UserProfileProject = ({ project }: { project: Project }) => {
  const projectColor = useColor(project.iconColor);

  return (
    <Link
      key={project.id}
      href={`/projects/${project.id}/overview`}
      className="user-profile__project"
    >
      <svg
        className={`user-profile__project-icon sidebar__color-icon--${projectColor}`}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
      </svg>
      <span className="user-profile__project-name">{project.name}</span>
    </Link>
  );
};

const UserProfileTask = ({ task }: { task: Task }) => {
  return (
    <div
      onClick={() => {
        // Todo: Open task detail modal
      }}
      className="one-task"
      key={task.id}
    >
      <div>{task.name}</div>
      <div>
        <AssigneeButton task={task} />
      </div>
    </div>
  );
};
