import Head from "next/head";
import { useState } from "react";
import TextPromptImageGenerationSection from "../../../components/section/TextPromptImageGenerationSection";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { generateTextToImage } from "../../../utils/api";
import { generateRandomSeed } from "../../../utils/helpers";
import { NextPage } from "next";

const TextToImagePage: NextPage = () => {
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
    console.log(generatedImages);
    setIsLoading(false);
  };

  const onSettingsChangeHandler = (id: string, value: number | string) => {
    setGenerationParameters((prevState) => {
      return { ...prevState, [id]: value };
    });
    console.log(generationParameters);
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
