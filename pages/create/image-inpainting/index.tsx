import Head from "next/head";
import { useRef, useState } from "react";
import ImageMaskUploadSection from "../../../components/Section/ImageMaskUploadSection";
import ImageUploadForm from "../../../components/Section/ImageUploadForm";
import TextPromptImageGenerationSection from "../../../components/Section/TextPromptImageGenerationSection";
import Alert from "../../../components/UI/Alert";
import Breadcrumbs from "../../../components/UI/Breadcrumbs";
import { ImageInpaintingGenerationParameters } from "../../../types/generationParameter";
import { addUserProject, createImageMask, generateImageInpainting } from "../../../utils/api";
import { generateRandomSeed } from "../../../utils/helpers";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { dataURLtoFile } from "../../../utils/helpers";
import { Types } from "mongoose";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import axios from "axios";
import { TypeUser } from "../../../types/types";

const ImageInpaintingPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ userId }) => {
  const defaultGenParams = {
    prompt: "",
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "",
    num_images_per_prompt: 1,
    seed: generateRandomSeed(),
  };

  const generationSectionScrollRef = useRef<null | HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imageMask, setImageMask] = useState<File | null>(null);

  const [generationParameters, setGenerationParameters] =
    useState<ImageInpaintingGenerationParameters>(defaultGenParams);

  enum AlertMessage {
    InitialImageMissing = "Please upload Initial Image first",
    BothImagesMissing = "Please upload Images first",
    SavingUserProject = "Saving project data...",
    SavedSuccessfully = "Saved the project successfully!",
    ErrorSaving = "An error occurred while saving image, please try again",
  }

  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generatedImageIsLoading, setGeneratedImageIsLoading] = useState(false);
  const [maskIsLoading, setMaskIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: AlertMessage;
    type: "info" | "success" | "warning" | "error";
  }>({ show: false, message: AlertMessage.InitialImageMissing, type: "info" });

  const uploadImageMaskHandler = (image: File) => {
    if (!uploadedImage) {
      setAlert((prevState) => {
        return { ...prevState, show: true };
      });
      setTimeout(() => {
        setAlert((prevState) => {
          return { ...prevState, show: false };
        });
      }, 3000);
      return;
    }
    setImageMask(image);

    generationSectionScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateImageMaskHandler = async () => {
    if (!uploadedImage) {
      setAlert((prevState) => {
        return { ...prevState, show: true };
      });
      setTimeout(() => {
        setAlert((prevState) => {
          return { ...prevState, show: false };
        });
      }, 3000);
      return;
    }

    setMaskIsLoading(true);

    const formData = new FormData();

    formData.append("image", uploadedImage);

    const response = await createImageMask(formData);
    const data = response.data;

    const generatedImageMaskFile = dataURLtoFile(data, "generated_image_mask.jpeg");

    setImageMask(generatedImageMaskFile);
    setMaskIsLoading(false);

    generationSectionScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSettingsChangeHandler = (id: string, value: number | string) => {
    setGenerationParameters((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  const onGenerateClickHandler = async () => {
    if (!uploadedImage && !imageMask) {
      setAlert({ show: true, message: AlertMessage.BothImagesMissing, type: "warning" });
      setTimeout(() => {
        setAlert({ show: false, message: AlertMessage.InitialImageMissing, type: "warning" });
      }, 3000);
      return;
    }

    if (uploadedImage && imageMask) {
      setGeneratedImageIsLoading(true);
      const formData = new FormData();
      formData.append("initial_image", uploadedImage, uploadedImage.name);

      formData.append("mask_image", imageMask, imageMask.name);
      for (const key in generationParameters) {
        // @ts-ignore
        formData.append(key, generationParameters[key]);
      }
      const response = await generateImageInpainting(formData);
      const result = await response.data;
      setGeneratedImages(result);
      setGeneratedImageIsLoading(false);

      if (userId) {
        try {
          setAlert({ show: true, message: AlertMessage.SavingUserProject, type: "info" });
          const response = await addUserProject(userId, {
            tool: "Image inpainting",
            model: "runwayml/stable-diffusion-inpainting",
            images: result,
            generationParameters: generationParameters,
            timeStamp: new Date(),
          });
          setAlert({ show: true, message: AlertMessage.SavedSuccessfully, type: "success" });
          setTimeout(() => {
            setAlert({ show: false, message: AlertMessage.InitialImageMissing, type: "info" });
          }, 3000);
          console.log(response);
        } catch (error) {
          setAlert({ show: true, message: AlertMessage.ErrorSaving, type: "error" });
          setTimeout(() => {
            setAlert({ show: false, message: AlertMessage.InitialImageMissing, type: "info" });
          }, 3000);
          console.log(error);
        }
      }
    }
  };
  return (
    <>
      <Head>
        <title>Image Inpainting - RealEnvision</title>
        <meta name="Image Inpainting" content="Page to generate images with Image inpainting tool" />
      </Head>

      <>
        {alert.show && <Alert message={alert.message} type={alert.type} />}

        <div className="h-screen">
          <Breadcrumbs
            links={[
              { title: "Home", href: "/" },
              { title: "Studio", href: "/create" },
              { title: "Image Inpainting Tool" },
            ]}
          />
          {/* note: upload initial image area */}
          <div className="h-full mx-8 flex gap-4">
            <ImageUploadForm
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
              buttonOptions={
                <div className="space-x-4">
                  <button
                    className="btn btn-primary btn-sm mx-auto normal-case w-44"
                    onClick={() => {
                      setUploadedImage(null);
                      setImageMask(null);
                      setGenerationParameters(defaultGenParams);
                      setGeneratedImageIsLoading(false);
                      setMaskIsLoading(false);
                      setGeneratedImages([]);
                    }}
                  >
                    Remove
                  </button>
                </div>
              }
            />
            {/* Note: Upload Mask Area */}
            <ImageMaskUploadSection
              imageMask={imageMask}
              onUploadImageMask={uploadImageMaskHandler}
              onGenerateMaskClick={generateImageMaskHandler}
              maskIsLoading={maskIsLoading}
            />
          </div>
        </div>

        <div ref={generationSectionScrollRef} className="h-screen scroll-mt-8">
          <TextPromptImageGenerationSection
            generatedImages={generatedImages}
            generationParameters={generationParameters}
            isLoading={generatedImageIsLoading}
            onGenerateClickHandler={onGenerateClickHandler}
            onSettingsChangeHandler={onSettingsChangeHandler}
            showHeightWidth={false}
          />
        </div>
      </>
    </>
  );
};
export default ImageInpaintingPage;

export const getServerSideProps: GetServerSideProps<{ userId?: Types.ObjectId }> = async (
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

  return {
    props: { userId },
  };
};
