import Head from "next/head";
import { useState } from "react";
import TextPromptImageGenerationSection from "../../../components/section/TextPromptImageGenerationSection";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { addUserProject, generateTextToImage } from "../../../utils/api";
import { generateRandomSeed } from "../../../utils/helpers";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { NextAPIClient } from "../../../utils/axiosClient";
import { TypeUser } from "../../../types/types";
import { Types } from "mongoose";

const TextToImagePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ userId }) => {
  const [generationParameters, setGenerationParameters] = useState({
    prompt: "",
    height: 512,
    width: 512,
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "",
    num_images_per_prompt: 1,
    seed: generateRandomSeed(),
  });

  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGenerateClickHandler = async () => {
    setIsLoading(true);
    const result = await generateTextToImage(generationParameters);
    setGeneratedImages(result.data);
    setIsLoading(false);

    if (userId) {
      const response = await addUserProject(userId, {
        tool: "Text to image",
        model: "runwayml/stable-diffusion-v1-5",
        images: result.data,
        generationParameters: generationParameters,
        timeStamp: new Date(),
      });
      console.log(response.data);
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

export const getServerSideProps: GetServerSideProps<{ userId?: Types.ObjectId }> = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      props: {},
    };
  }

  const response = await NextAPIClient.get(`/api/users/by-email/${session.user?.email}`);
  const user: TypeUser = (await response.data.data) as TypeUser;
  const userId = user._id;

  return {
    props: { userId },
  };
};
