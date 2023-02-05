import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type NavBarProps = {};

const NavBar: FC<NavBarProps> = (props) => {
  const router = useRouter();

  const navLinks = [
    { title: "Studio", path: "/create" },
    { title: "Profile", path: "/profile" },
    { title: "Guide", path: "/guide" },
  ];

  return (
    <div className="navbar px-8 bg-base-100">
      <div className="flex-1 space-x-4">
        <Link href="/" legacyBehavior>
          <a className="btn btn-ghost normal-case text-xl">RealEnvision</a>
        </Link>

        {navLinks.map((link) => (
          <Link key={link.title} href={link.path} legacyBehavior>
            <a
              className={`btn btn-sm text-base normal-case rounded-md ${
                router.pathname === link.path ? "btn-active" : "btn-outline"
              }`}
            >
              {link.title}
            </a>
          </Link>
        ))}
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
