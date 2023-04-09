import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import AuthProviderButton from "../../components/inputs/AuthProviderButton";
import { Fragment } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignInPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ providers }) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-8 rounded-lg w-[22rem] bg-base-100 shadow-xl">
        <h1 className="font-semibold text-center text-lg mb-4">Sign In with</h1>
        {Object.values(providers).map((provider, index) => (
          <Fragment key={provider.name}>
            <AuthProviderButton
              label={`${provider.name}`}
              onClick={() => signIn(provider.id)}
              icon={provider.id === "github" ? <FaGithub size={25} /> : <FcGoogle size={25} />}
            />
            {index !== Object.keys(providers).length - 1 && <div className="divider">or</div>}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SignInPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
