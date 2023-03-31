import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { authOptions } from "../../api/auth/[...nextauth]";

const UserSettings: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => {
  const [userData, setUserData] = useState<{
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }>(user);

  const router = useRouter();

  const updateUserInfo = async () => {
    const { data } = await axios.put(`/api/users/by-email/${userData.email}`, {
      name: "The double best",
      image: "https://avatars.githubusercontent.com/u/97651719?v=4",
    });
    console.log(data);
    setUserData(data.data);
    router.reload();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/3 h-1/2 bg-base-300">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
      </div>
    </div>
  );
};
export default UserSettings;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { user } = session;

  return {
    props: { user },
  };
};
