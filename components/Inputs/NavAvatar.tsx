import { Types } from "mongoose";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

type NavAvatarProps = {
  image: string;
  userId: Types.ObjectId | undefined;
};

const NavAvatar: FC<NavAvatarProps> = ({ image, userId }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {/* @ts-ignore */}
          <img src={image} alt="User Avatar Image" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        {userId && (
          <>
            <li>
              <Link href={`/user/projects/${userId}`} legacyBehavior>
                <a>Projects</a>
              </Link>
            </li>
            <li>
              <Link href={`/user/settings/${userId}`} legacyBehavior>
                <a>Settings</a>
              </Link>
            </li>
          </>
        )}
        <li>
          <a onClick={() => signOut()}>Logout</a>
        </li>
      </ul>
    </div>
  );
};
export default NavAvatar;
