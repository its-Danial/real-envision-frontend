import { Types } from "mongoose";
import { signIn, useSession } from "next-auth/react";
import { FC } from "react";
import NavAvatar from "./NavAvatar";

type NavAuthButtonProps = {
  userId: Types.ObjectId | undefined;
};

const NavAuthButton: FC<NavAuthButtonProps> = ({ userId }) => {
  const { data: session } = useSession();
  if (session) {
    return <NavAvatar image={session.user?.image!} userId={userId} />;
  }
  return (
    <button className="btn btn-sm text-base normal-case rounded-md" onClick={() => signIn()}>
      Sign in
    </button>
  );
};
export default NavAuthButton;
