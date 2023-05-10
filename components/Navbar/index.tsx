import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { TypeUser } from "../../types/types";
import axios from "axios";
import NavAvatar from "../Inputs/NavAvatar";

const NavBar: FC = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<TypeUser>();
  const [userIsLoading, setUserIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setUserIsLoading(true);
      const response = await axios.get(`/api/users/by-email/${session?.user?.email}`);
      const data = await response.data;
      setUser(data.data);
      setUserIsLoading(false);
    };

    if (session) {
      fetchUser();
    }
  }, [session]);

  const router = useRouter();

  const renderNavButtons = () => {
    if (session) {
      return <NavAvatar image={session.user?.image!} userId={user?._id} />;
    }
    return (
      <button className="btn btn-sm text-base normal-case rounded-md" onClick={() => signIn()}>
        Sign in
      </button>
    );
  };

  return (
    <div className="navbar px-8 bg-base-100">
      <div className="flex-1 space-x-4">
        <Link href="/" legacyBehavior>
          <a className="btn btn-ghost normal-case text-xl">RealEnvision</a>
        </Link>

        <Link href="/create" legacyBehavior>
          <a
            className={`btn btn-sm text-base normal-case rounded-md ${
              router.pathname.startsWith("/create") ? "btn-active" : "btn-outline"
            }`}
          >
            Studio
          </a>
        </Link>

        <Link href="/custom-model" legacyBehavior>
          <a
            className={`btn btn-sm text-base normal-case rounded-md ${
              router.pathname.startsWith("/custom-model") ? "btn-active" : "btn-outline"
            }`}
          >
            Custom Model
          </a>
        </Link>

        {session && userIsLoading && (
          <button className="btn btn-sm text-base normal-case btn-outline rounded-md loading disabled">Projects</button>
        )}

        {!userIsLoading && user && (
          <Link href={`/user/projects/${user._id}`} legacyBehavior>
            <a
              className={`btn btn-sm text-base normal-case rounded-md ${
                router.pathname.startsWith("/user/projects/") ? "btn-active" : "btn-outline"
              }`}
            >
              Projects
            </a>
          </Link>
        )}
      </div>

      {!router.pathname.startsWith("/auth/signin") && <div className="flex-none">{renderNavButtons()}</div>}
    </div>
  );
};
export default NavBar;
