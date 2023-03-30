import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { TypeUser } from "../../types/users";
import axios from "axios";
import NavAuthButton from "../inputs/NavAuthButton";

type NavBarProps = {};

const NavBar: FC<NavBarProps> = (props) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<TypeUser>();

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/by-email/${session?.user?.email}`).then(({ data }) => setUser(data.data));
    }
  }, [session]);

  const router = useRouter();

  const navLinks = [
    { title: "Studio", path: "/create" },
    { title: "Custom Model", path: "/custom-model" },
  ];

  if (session && user) {
    navLinks.push({ title: "Projects", path: `/user/projects/${user._id}` });
  }

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
                router.pathname.startsWith(link.path) ? "btn-active" : "btn-outline"
              }`}
            >
              {link.title}
            </a>
          </Link>
        ))}
      </div>

      <div className="flex-none">
        <NavAuthButton userId={user?._id} />
      </div>
    </div>
  );
};
export default NavBar;
