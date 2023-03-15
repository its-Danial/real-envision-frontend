import { FC, useState } from "react";
import TextPromptImageGenerationSection from "../../../components/section/TextPromptImageGenerationSection";
import { generateTextToImage } from "../../../utils/api";
import { generateRandomSeed } from "../../../utils/constants";

const TextToImage: FC = () => {
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
    <TextPromptImageGenerationSection
      generatedImages={generatedImages}
      generationParameters={generationParameters}
      isLoading={isLoading}
      onGenerateClickHandler={onGenerateClickHandler}
      onSettingsChangeHandler={onSettingsChangeHandler}
    />
  );
};
export default TextToImage;
