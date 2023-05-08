import Head from "next/head";
import { useRef, useState } from "react";
import ImageSettingsSection from "../../../components/Section/ImageSettingsSection";
import ImageUploadForm from "../../../components/Section/ImageUploadForm";
import Breadcrumbs from "../../../components/UI/Breadcrumbs";
import { SuperResolutionGenerationParameters } from "../../../types/generationParameter";
import { addUserProject, generateSuperResolution } from "../../../utils/api";
import {
  dataURLtoFile,
  generateRandomSeed,
  instanceOfImageToImageGenParams,
  reshapeGenParams,
} from "../../../utils/helpers";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import axios from "axios";
import { TypeProject, TypeUser } from "../../../types/types";
import Alert from "../../../components/UI/Alert";
import { instanceOfSuperResolutionGenParams } from "../../../utils/helpers";

const SuperResolutionPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  userId,
  userProject,
}) => {
  const defaultGenParams = {
    prompt: "",
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "",
    num_images_per_prompt: 1,
    seed: generateRandomSeed(),
  };

  const preLoadedParam = userProject
    ? instanceOfSuperResolutionGenParams(userProject.generationParameters)
      ? userProject.generationParameters
      : reshapeGenParams(userProject.generationParameters, "super-resolution")
    : defaultGenParams;

  const preLoadedImages = userProject ? userProject.images : [];

  const preLoadedFile = userProject
    ? dataURLtoFile(preLoadedImages[0], `${userProject.generationParameters.prompt}.jpeg`)
    : null;

  const mainScrollRef = useRef<null | HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<File | null>(preLoadedFile);

  const [generationParameters, setGenerationParameters] = useState(
    preLoadedParam as SuperResolutionGenerationParameters
  );
  console.log("generationParameters", generationParameters);

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
      setAlert({ show: true, message: "Please upload initial image first", type: "warning" });
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "info" });
      }, 3000);
      return;
    }
    mainScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSettingsChangeHandler = (id: string, value: number | string) => {
    setGenerationParameters((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  const onGenerateClickHandler = async () => {
    if (!uploadedImage) {
      setAlert({ show: true, message: "Please upload initial image first", type: "warning" });
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "info" });
      }, 3000);
      return;
    }
    if (generationParameters.prompt.length === 0) {
      setAlert({ show: true, message: "Please enter prompt", type: "warning" });
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "info" });
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

    const response = await generateSuperResolution(formData);
    const result = await response.data;

    setGeneratedImages(result);
    setIsLoading(false);

    if (userId) {
      try {
        setAlert({ show: true, message: "Saving project data...", type: "info" });
        const response = await addUserProject(userId, {
          tool: "Super-Resolution",
          model: "stabilityai/stable-diffusion-x4-upscaler",
          images: result,
          generationParameters: generationParameters,
          timeStamp: new Date(),
        });
        console.log("save response", response);
        setAlert({ show: true, message: "Saved the project successfully!", type: "success" });
        setTimeout(() => {
          setAlert({ show: false, message: "", type: "info" });
        }, 3000);
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

      <Breadcrumbs
        links={[{ title: "Home", href: "/" }, { title: "Studio", href: "/create" }, { title: "Super Resolution Tool" }]}
      />

      <Alert
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onHideClick={() => {
          setAlert((prevState) => {
            return { ...prevState, show: false };
          });
        }}
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
                  setGenerationParameters(defaultGenParams);
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
export default SuperResolutionPage;

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
  const userDataResponse = await axios.get(`${process.env.PUBLIC_BASE_URL}/api/users/by-email/${session.user?.email}`);
  const user: TypeUser = await userDataResponse.data.data;
  const userId = user._id;

  // Get project if loaded from /user/project/[userId] page
  const { projectId } = ctx.query;

  if (!projectId) {
    return {
      props: { userId },
    };
  }

  const userProjectResponse = await axios.get(
    `${process.env.PUBLIC_BASE_URL}/api/users/projects/${userId}/${projectId}`
  );
  const userProject = await userProjectResponse.data.data;

  return {
    props: { userId, userProject },
  };
};
