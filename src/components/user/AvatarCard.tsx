import Link from "next/link";
import { User } from "@prisma/client";
import { useDeleteProject } from "@/hooks/ProjectHooks";
import { getInitials } from "@/utils/user";

const AvatarCard = ({ user }: { user: Partial<User> }) => {
  const { mutate } = useDeleteProject();

  return (
    <Link href={`/profile/${user.id!}`} className="avatar-card">
      {user.image ? (
        <img className="avatar-card__image" src={user.image} />
      ) : (
        <div className={`avatar-card__icon`}>{getInitials(user.name!)}</div>
      )}
      <span className="avatar-card__name">{user.name}</span>
    </Link>
  );
};

export default AvatarCard;
