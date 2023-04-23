import { Types } from "mongoose";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useState } from "react";
import TextPromptImageGenerationSection from "../../../components/section/TextPromptImageGenerationSection";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { TypeProject, TypeUser } from "../../../types/types";
import { addUserProject, generateTextToImage } from "../../../utils/api";
import { NextAPIClient } from "../../../utils/axiosClient";
import { generateRandomSeed, instanceOfTextToImageGenParams, reshapeGenParams } from "../../../utils/helpers";
import { authOptions } from "../../api/auth/[...nextauth]";
import { TextToImageGenerationParameters } from "../../../types/generationParameter";
import Alert from "../../../components/ui/Alert";

const TextToImagePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ userId, userProject }) => {
  const defaultParams = {
    prompt: "",
    height: 512,
    width: 512,
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "",
    num_images_per_prompt: 1,
    seed: generateRandomSeed(),
  };

  const preLoadedParam = userProject
    ? instanceOfTextToImageGenParams(userProject.generationParameters)
      ? userProject.generationParameters
      : reshapeGenParams(userProject.generationParameters, "text-to-image")
    : defaultParams;

  const preLoadedImages = userProject ? userProject.images : [];
  const [generationParameters, setGenerationParameters] = useState(preLoadedParam as TextToImageGenerationParameters);
  const [generatedImages, setGeneratedImages] = useState<string[]>(preLoadedImages);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: "info" | "success" | "warning" | "error";
  }>({ show: false, message: "", type: "info" });

  const onGenerateClickHandler = async () => {
    setIsLoading(true);
    const result = await generateTextToImage(generationParameters);
    setGeneratedImages(result.data);
    setIsLoading(false);

    if (userId) {
      try {
        setAlert({ show: true, message: "Saving project data...", type: "info" });
        const response = await addUserProject(userId, {
          tool: "Text to image",
          model: "runwayml/stable-diffusion-v1-5",
          images: result.data,
          generationParameters: generationParameters,
          timeStamp: new Date(),
        });
        setAlert({ show: true, message: "Saved the project successfully!", type: "success" });
        setTimeout(() => {
          setAlert({ show: false, message: "", type: "info" });
        }, 3000);
        console.log(response);
      } catch (error) {
        setAlert({ show: true, message: "An error occurred while saving image, please try again", type: "error" });
        setTimeout(() => {
          setAlert({ show: false, message: "", type: "info" });
        }, 3000);
        console.log(error);
      }
    }
  };

  const onSettingsChangeHandler = (id: string, value: number | string) => {
    setGenerationParameters((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  return (
    <>
      <Head>
        <title>Text to Image - RealEnvision</title>
        <meta name="Text to Image" content="Page to generate images with Text to Image tool" />
      </Head>

      {alert.show && <Alert message={alert.message} type={alert.type} />}

      <Breadcrumbs
        links={[{ title: "Home", href: "/" }, { title: "Studio", href: "/create" }, { title: "Text To Image Tool" }]}
      />

      <TextPromptImageGenerationSection
        generatedImages={generatedImages}
        generationParameters={generationParameters}
        isLoading={isLoading}
        onGenerateClickHandler={onGenerateClickHandler}
        onSettingsChangeHandler={onSettingsChangeHandler}
      />
    </>
  );
};
export default TextToImagePage;

export const getServerSideProps: GetServerSideProps<{ userId?: Types.ObjectId; userProject?: TypeProject }> = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      props: {},
    };
  }

  // Get user if authenticated
  const userDataResponse = await NextAPIClient.get(`/api/users/by-email/${session.user?.email}`);
  const user: TypeUser = await userDataResponse.data.data;
  const userId = user._id;

  // Get project if loaded from /user/project/[userId] page
  const { projectId } = ctx.query;

  if (!projectId) {
    return {
      props: { userId },
    };
  }

  const userProjectResponse = await NextAPIClient.get(`/api/users/projects/${userId}/${projectId}`);
  const userProject = await userProjectResponse.data.data;

  return {
    props: { userId, userProject },
  };
};
