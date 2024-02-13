import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import Image from "next/image";
import { getInitials } from "@/utils/user";
import { User } from "@prisma/client";
import { useProjectInvitees } from "@/hooks/ProjectHooks";
import { useWorkspaceInvitees } from "@/hooks/WorkspaceHooks";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import validateEmail from "@/utils/validateEmail";

type Props = {
  isOpen: boolean;
  isDark: boolean;
  setIsOpen: (isOpen: boolean) => void;
  owner: { id: string; name: string; image: string };
  members: { id: string; name: string; image: string }[];
  // Invite to a project or workspace
  projectId?: string;
  workspaceId?: string;
};

export const InviteMemberProject = ({
  isOpen,
  isDark,
  setIsOpen,
  owner,
  projectId,
  members,
}: Props) => {
  const { invitees, status } = useProjectInvitees(projectId!);
  const [emailInput, setEmailInput] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  useEffect(() => {
    if (emailInput.trim().length > 0) {
      if (validateEmail(emailInput)) {
        setIsEmailValid(true);
      } else if (!validateEmail(emailInput)) {
        setIsEmailValid(false);
      }
    } else {
      setIsEmailValid(false);
    }
  }, [emailInput]);

  return (
    <Modal
      className="invite-member"
      isOpen={isOpen}
      closeHandler={() => {
        setIsOpen(false);
      }}
      closeBtn={true}
      isDark={isDark}
    >
      <div className="invite-member__title">Invite to project</div>
      <div className="invite-member__input">
        <input
          type="text"
          placeholder="Email address"
          className="email"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
        <button
          className="invite-btn button"
          disabled={!isEmailValid}
          onClick={() => {
            // sendProjectInvite();
            console.log("Invite new member to project");
          }}
        >
          Invite
        </button>
      </div>
      <div className="invite-member__current-members">
        {status === "loading" && <LoadingMembers />}
        {status === "success" && (
          <>
            <Member member={owner} type="Owner" />
            {members.map((member) => (
              <Member key={member.id} member={member} type="Member" />
            ))}
            {invitees?.map((invitee) => (
              <InvitedMember inviteee={invitee} key={invitee.id} />
            ))}
          </>
        )}
      </div>
    </Modal>
  );
};
export const InviteMemberWorkspace = ({
  isOpen,
  isDark,
  setIsOpen,
  owner,
  workspaceId,
  members,
}: Props) => {
  const { invitees, status } = useWorkspaceInvitees(workspaceId!);
  const [emailInput, setEmailInput] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  useEffect(() => {
    if (emailInput.trim().length > 0) {
      if (validateEmail(emailInput)) {
        setIsEmailValid(true);
      } else if (!validateEmail(emailInput)) {
        setIsEmailValid(false);
      }
    } else {
      setIsEmailValid(false);
    }
  }, [emailInput]);

  return (
    <Modal
      className="invite-member"
      isOpen={isOpen}
      closeHandler={() => {
        setIsOpen(false);
      }}
      closeBtn={true}
      isDark={isDark}
    >
      <div className="invite-member__title">Invite to workspace</div>
      <div className="invite-member__input">
        <input
          type="text"
          placeholder="Email address"
          className="email"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
        <button
          className="invite-btn button"
          disabled={!isEmailValid}
          onClick={() => {
            // sendProjectInvite();
            console.log("Invite new member to workspace");
          }}
        >
          Invite
        </button>
      </div>
      <div className="invite-member__current-members">
        {status === "loading" && <LoadingMembers />}
        {status === "success" && (
          <>
            <Member member={owner} type="Owner" />
            {members.map((member) => (
              <Member key={member.id} member={member} type="Member" />
            ))}
            {invitees?.map((invitee) => (
              <InvitedMember inviteee={invitee} key={invitee.id} />
            ))}
          </>
        )}
      </div>
    </Modal>
  );
};

const Member = ({
  member,
  type,
}: {
  member: User | { name: string; image: string };
  type: "Member" | "Owner";
}) => {
  return (
    <div className="invite-member__member">
      {member.image ? (
        <Image
          className="invite-member__image"
          src={member.image}
          alt="Profile picture"
        />
      ) : (
        <div className="invite-member__initials">
          {getInitials(member.name)}
        </div>
      )}
      <span className="invite-member__name">{member.name}</span>

      <div className="invite-member__type">{type}</div>
    </div>
  );
};
const InvitedMember = ({ inviteee }: { inviteee: { email: string } }) => {
  return (
    <div className="invite-member__member">
      <div className="invite-member__invited-icon"></div>
      <div className="invite-member__invited-name">{inviteee.email}</div>

      <div className="invite-member__type">Invited</div>
    </div>
  );
};

const LoadingMembers = () => {
  return (
    <div className="loading">
      <div className="invite-member__member--loading">
        <LoadingSkeleton />
      </div>
      <div className="invite-member__member--loading">
        <LoadingSkeleton />
      </div>
      <div className="invite-member__member--loading">
        <LoadingSkeleton />
      </div>
    </div>
  );
};
