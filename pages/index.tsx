import type { NextPage } from "next";
import Head from "next/head";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import landingPageImageDark from "../public/assets/landing-page/projects-page-dark.png";
import landingPageImageLight from "../public/assets/landing-page/projects-page-light.png";

import Image from "next/image";
import useThemeDetector from "../hooks/useThemeDetector";
import { RoughNotation } from "react-rough-notation";
import FeaturesCard from "../components/Card/FeaturesCard";
import Link from "next/link";
import { useSession } from "next-auth/react";

const HomePage: NextPage = () => {
  const { data: session } = useSession();
  const isDarkTheme = useThemeDetector();

  return (
    <>
      <Head>
        <title>RealEnvision</title>
      </Head>
      <div className="min-h-screen bg-base-200 pb-[15vh]">
        <div className="flex flex-col items-center max-w-6xl mx-auto pt-[20vh]">
          <div className="text-center mb-[10vh]">
            <div className="max-w-5xl">
              <h1 className="text-6xl font-bold mb-10">
                Generate <span className={`${isDarkTheme ? "text-primary" : "text-blue-500"}`}>unique</span> art and
                images with the power of ML{" "}
                <RoughNotation type="underline" show color={isDarkTheme ? "#ff79c6" : "#0d0d0d"} strokeWidth={1.5}>
                  Diffusion models.
                </RoughNotation>
              </h1>
              {!session && (
                <Link href="/auth/signin">
                  <button className="btn gap-3 mb-2 w-64 text-base normal-case text-center">
                    Get started
                    <BsFillArrowRightCircleFill size={20} />
                  </button>
                </Link>
              )}
              <p className="text-xs font-bold">No credit card or setup required. All from your browser.</p>
            </div>
          </div>
          <Image
            src={isDarkTheme ? landingPageImageDark : landingPageImageLight}
            alt="RealEnvision Projects page sample"
            className="rounded-lg"
          />
        </div>
        <div className="max-w-6xl mx-auto mt-[15vh]">
          <div className="flex justify-between">
            <FeaturesCard
              icons="💰"
              title="Completely free"
              texts={[
                "All image generation features are completely free of charge for everyone.",
                "Create free account for extra features like saving projects and reusing settings",
              ]}
            />
            <FeaturesCard
              icons="😌"
              title="Hassle-Free & Easy to Use"
              texts={[
                "Everything you need right in your browser, available from anywhere.",
                "No installations or set up needed.",
              ]}
            />
            <FeaturesCard
              icons="🤖"
              title="Powerful ML Tools"
              texts={[
                "Create images with text, from other images, edit images using inpainting, and upscale resolution.",
                "Reuse projects and there settings to create variations that best fit your needs.",
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
