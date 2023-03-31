import Head from "next/head";
import { FC, useRef, useState } from "react";
import ImageSettingsSection from "../../../components/section/ImageSettingsSection";
import ImageUploadForm from "../../../components/section/ImageUploadForm";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { ImageToImageGenerationParameters } from "../../../types/generationParameter";
import { generateImageToImage } from "../../../utils/api";
import { generateRandomSeed } from "../../../utils/constants";

const ImageToImage: FC = () => {
  const mainScrollRef = useRef<null | HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [generationParameters, setGenerationParameters] = useState<ImageToImageGenerationParameters>({
    prompt: "",
    strength: 0.8,
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "",
    num_images_per_prompt: 1,
    seed: generateRandomSeed(),
  });

  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const initialImageSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!uploadedImage) {
      alert("Upload an image");
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
      alert("Upload an image");
      return;
    }
    if (generationParameters.prompt.length === 0) {
      alert("Prompt is required");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("initial_image", uploadedImage, uploadedImage.name);

    for (const key in generationParameters) {
      // @ts-ignore
      formData.append(key, generationParameters[key]);
    }

    const response = await generateImageToImage(formData);
    const data = await response.data;

    console.log(data);
    setGeneratedImages(data);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Image to Image - RealEnvision</title>
        <meta name="Image to Image" content="Page to generate images with Image to Image tool" />
      </Head>

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
                onClick={() => setUploadedImage(null)}
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
export default ImageToImage;
