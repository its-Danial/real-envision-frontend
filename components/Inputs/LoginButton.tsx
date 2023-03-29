import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type LoginButtonProps = {};

const LoginButton: FC<LoginButtonProps> = (props) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {/* @ts-ignore */}
            <img src={session.user?.image} alt="User Avatar Image" />
          </div>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a onClick={() => signOut()}>Logout</a>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <button className="btn btn-sm text-base normal-case rounded-md" onClick={() => signIn()}>
      Sign in
    </button>
  );
};
export default LoginButton;
