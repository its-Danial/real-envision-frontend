import Head from "next/head";
import { useRef, useState } from "react";
import ImageMaskUploadSection from "../../../components/Section/ImageMaskUploadSection";
import ImageUploadForm from "../../../components/Section/ImageUploadForm";
import TextPromptImageGenerationSection from "../../../components/Section/TextPromptImageGenerationSection";
import Alert from "../../../components/UI/Alert";
import Breadcrumbs from "../../../components/UI/Breadcrumbs";
import { ImageInpaintingGenerationParameters } from "../../../types/generationParameter";
import { createImageMask, generateImageInpainting } from "../../../utils/api";
import { generateRandomSeed } from "../../../utils/helpers";
import { NextPage } from "next";

const ImageInpaintingPage: NextPage = () => {
  const generationSectionScrollRef = useRef<null | HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imageMask, setImageMask] = useState<File | string | null>(null);

  const [generationParameters, setGenerationParameters] = useState<ImageInpaintingGenerationParameters>({
    prompt: "",
    height: 512,
    width: 512,
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "",
    num_images_per_prompt: 1,
    seed: generateRandomSeed(),
  });

  enum AlertMessage {
    InitialImageMissing = "Please upload Initial Image first",
    BothImagesMissing = "Please upload Images first",
  }

  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generatedImageIsLoading, setGeneratedImageIsLoading] = useState(false);
  const [maskIsLoading, setMaskIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: AlertMessage.InitialImageMissing });

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
    console.log(image);
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
    formData.append("image", uploadedImage, uploadedImage.name);

    const response = await createImageMask(formData);
    const data = response.data;

    setImageMask(data);
    setMaskIsLoading(false);

    generationSectionScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSettingsChangeHandler = (id: string, value: number | string) => {
    setGenerationParameters((prevState) => {
      return { ...prevState, [id]: value };
    });
    console.log(generationParameters);
  };

  const onGenerateClickHandler = async () => {
    if (!uploadedImage && !imageMask) {
      setAlert({ show: true, message: AlertMessage.BothImagesMissing });
      setTimeout(() => {
        setAlert({ show: false, message: AlertMessage.InitialImageMissing });
      }, 3000);
      return;
    }

    if (uploadedImage && imageMask) {
      // TODO: Fix for when mask is generated
      setGeneratedImageIsLoading(true);
      const formData = new FormData();
      formData.append("initial_image", uploadedImage, uploadedImage.name);
      formData.append("mask_image", imageMask, "mask_image");
      for (const key in generationParameters) {
        // @ts-ignore
        formData.append(key, generationParameters[key]);
      }
      const response = await generateImageInpainting(formData);
      const data = await response.data;
      console.log(data);
      setGeneratedImages(data);
      setGeneratedImageIsLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Image Inpainting - RealEnvision</title>
        <meta name="Image Inpainting" content="Page to generate images with Image inpainting tool" />
      </Head>

      <>
        {alert.show && <Alert message={alert.message} type="info" />}

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
          />
        </div>
      </>
    </>
  );
};
export default ImageInpaintingPage;
