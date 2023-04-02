import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { authOptions } from "../../api/auth/[...nextauth]";
import LabelTextInput from "../../../components/inputs/LabelTextInput";
import SettingsAvatar from "../../../components/inputs/SettingsAvatar";
import SelectInput from "../../../components/inputs/SelectInput";

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
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-lg w-full p-8 grid gap-5 bg-base-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Settings</h1>
        <SettingsAvatar />

        <LabelTextInput label="Name" placeholder="Enter your new name" />
        <LabelTextInput label="Email" placeholder="Enter your account email" />
        <SelectInput />
        <button className="btn btn-primary">Save</button>
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
