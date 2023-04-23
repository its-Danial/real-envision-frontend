import { Types } from "mongoose";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useRef, useState } from "react";
import ImageSettingsSection from "../../../components/Section/ImageSettingsSection";
import ImageUploadForm from "../../../components/Section/ImageUploadForm";
import Alert from "../../../components/UI/Alert";
import Breadcrumbs from "../../../components/UI/Breadcrumbs";
import { ImageToImageGenerationParameters } from "../../../types/generationParameter";
import { TypeProject, TypeUser } from "../../../types/types";
import { addUserProject, generateImageToImage } from "../../../utils/api";
import { NextAPIClient } from "../../../utils/axiosClient";
import {
  dataURLtoFile,
  generateRandomSeed,
  instanceOfImageToImageGenParams,
  reshapeGenParams,
} from "../../../utils/helpers";
import { authOptions } from "../../api/auth/[...nextauth]";

const ImageToImagePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  userId,
  userProject,
}) => {
  const defaultParams = {
    prompt: "",
    strength: 0.8,
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "",
    num_images_per_prompt: 1,
    seed: generateRandomSeed(),
  };

  const preLoadedParam = userProject
    ? instanceOfImageToImageGenParams(userProject.generationParameters)
      ? userProject.generationParameters
      : reshapeGenParams(userProject.generationParameters, "image-to-image")
    : defaultParams;

  const preLoadedImages = userProject ? userProject.images : [];

  const preLoadedFile = userProject ? dataURLtoFile(preLoadedImages[0], userProject.generationParameters.prompt) : null;

  const mainScrollRef = useRef<null | HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<File | null>(preLoadedFile);

  const [generationParameters, setGenerationParameters] = useState(preLoadedParam as ImageToImageGenerationParameters);

  const [generatedImages, setGeneratedImages] = useState<string[]>(preLoadedImages);
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: "info" | "success" | "warning" | "error";
  }>({ show: false, message: "", type: "info" });

  const initialImageSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!uploadedImage) {
      setAlert({ show: true, message: "Please upload Images first", type: "warning" });
      setTimeout(() => {
        setAlert((prevState) => {
          return { ...prevState, show: false };
        });
      }, 3000);
      return;
    }
    console.log("uploaded image", uploadedImage);

    mainScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSettingsChangeHandler = (id: string, value: number | string) => {
    setGenerationParameters((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  const onGenerateClickHandler = async () => {
    if (!uploadedImage) {
      setAlert({ show: true, message: "Please upload Images first", type: "warning" });
      setTimeout(() => {
        setAlert((prevState) => {
          return { ...prevState, show: false };
        });
      }, 3000);
      return;
    }
    if (generationParameters.prompt.length === 0) {
      setAlert({ show: true, message: "Please enter a prompt", type: "warning" });
      setTimeout(() => {
        setAlert((prevState) => {
          return { ...prevState, show: false };
        });
      }, 3000);
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("initial_image", uploadedImage, uploadedImage.name);

    for (const key in generationParameters) {
      // @ts-ignore
      formData.append(key, generationParameters[key]);
    }

    const result = await generateImageToImage(formData);
    const data = await result.data;

    setGeneratedImages(data);
    setIsLoading(false);

    if (userId) {
      try {
        setAlert({ show: true, message: "Saving project data...", type: "info" });
        const response = await addUserProject(userId, {
          tool: "Image to image",
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

  return (
    <>
      <Head>
        <title>Image to Image - RealEnvision</title>
        <meta name="Image to Image" content="Page to generate images with Image to Image tool" />
      </Head>

      {alert.show && <Alert message={alert.message} type={alert.type} />}

      <Breadcrumbs
        links={[{ title: "Home", href: "/" }, { title: "Studio", href: "/create" }, { title: "Image To Image Tool" }]}
      />

      {/* note upload image area */}
      <div className="h-screen flex justify-center">
        <ImageUploadForm
          onSubmit={initialImageSubmitHandler}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          buttonOptions={
            <div className="space-x-4">
              <button
                className="btn btn-primary btn-sm mx-auto normal-case w-44"
                onClick={() => {
                  setUploadedImage(null);
                  setGeneratedImages([]);
                }}
              >
                Remove
              </button>
              <button className="btn btn-primary btn-sm mx-auto normal-case w-44" type="submit">
                Submit
              </button>
            </div>
          }
        />
      </div>
      {uploadedImage && (
        <ImageSettingsSection
          generatedImages={generatedImages}
          generationParameters={generationParameters}
          isLoading={isLoading}
          mainScrollRef={mainScrollRef}
          onGenerateClickHandler={onGenerateClickHandler}
          onSettingsChangeHandler={onSettingsChangeHandler}
          uploadedImage={uploadedImage}
        />
      )}
    </>
  );
};
export default ImageToImagePage;

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
