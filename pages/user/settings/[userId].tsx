import axios from "axios";
import { useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import LabelTextInput from "../../../components/inputs/LabelTextInput";
import SelectInput from "../../../components/inputs/SelectInput";
import SettingsAvatar from "../../../components/inputs/SettingsAvatar";
import { TypeUser } from "../../../types/types";
import { NextAPIClient } from "../../../utils/axiosClient";
import { authOptions } from "../../api/auth/[...nextauth]";

const UserSettingsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => {
  const [userData, setUserData] = useState<TypeUser>(user);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const saveUserDataHandler = async () => {
    setIsLoading(true);
    const { data } = await axios.put(`/api/users/${userData._id}`, {
      name: userData.name,
      image: userData.image,
      profileDescription: userData.profileDescription,
      imageDownloadFormat: userData.imageDownloadFormat,
    });
    setUserData(data.data);
    setIsLoading(false);

    router.reload();
  };

  const valueChangeHandler = (key: string, value: string) => {
    console.log(key, value);
    setUserData((prevData) => {
      return { ...prevData, [key]: value };
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-lg w-full p-8 grid gap-5 bg-base-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Settings</h1>
        <SettingsAvatar image={userData.image!} onChange={valueChangeHandler.bind(this, "image")} />

        <LabelTextInput
          label="Name"
          placeholder="Enter your new name"
          value={userData.name!}
          onChange={valueChangeHandler.bind(this, "name")}
        />
        <LabelTextInput
          label="Email"
          placeholder="Enter your account email"
          value={userData.email!}
          disable
          onChange={valueChangeHandler.bind(this, "email")}
        />
        <LabelTextInput
          label="Profile Description"
          placeholder="Enter your profile description"
          value={userData.profileDescription ? userData.profileDescription : ""}
          disable={userData.profileDescription ? false : true}
          onChange={valueChangeHandler.bind(this, "profileDescription")}
        />
        <SelectInput
          value={userData.imageDownloadFormat}
          onChange={valueChangeHandler.bind(this, "imageDownloadFormat")}
        />
        <button
          className={`btn btn-primary ${isLoading && "loading"}`}
          onClick={saveUserDataHandler}
          disabled={userData.name.length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default UserSettingsPage;

export const getServerSideProps: GetServerSideProps<{ user: TypeUser }> = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await NextAPIClient.get(`/api/users/by-email/${session.user?.email}`);
  const user: TypeUser = await response.data.data;

  return {
    props: { user },
  };
};
