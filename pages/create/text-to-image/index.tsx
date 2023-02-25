import { FC, useState } from "react";
import Image from "next/image";
import { AiOutlineSetting } from "react-icons/ai";
import RiseLoader from "react-spinners/RiseLoader";
import { generateTextToImage } from "../../../utils/api";
import BasicCaptionCard from "../../../components/Card/BasicCaptionCard";
import LabelRangeInput from "../../../components/Inputs/LabelRangeInput";
import NegativePromptInput from "../../../components/Inputs/NegativePromptInput";

const TextToImage: FC = () => {
  const [generationParameters, setGenerationParameters] = useState({
    prompt: "",
    height: 512,
    width: 512,
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "",
    num_images_per_prompt: 1,
    seed: Math.floor(Math.random() * 10000),
  });

  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

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
    <div>
      {/* Note: Input */}
      <div className="pb-10 border-b border-gray-500 dark:border-gray-600">
        <div className="px-8 flex flex-row space-x-4">
          <label className="btn btn-square rounded-lg swap swap-rotate">
            <input onClick={() => setShowSetting((prevState) => !prevState)} type="checkbox" />
            <AiOutlineSetting className="swap-on fill-current w-[30px] h-[30px]" />
            <AiOutlineSetting className="swap-off fill-current w-[30px] h-[30px]" />
          </label>

          <input
            value={generationParameters.prompt}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onSettingsChangeHandler("prompt", event.currentTarget.value)
            }
            type="text"
            placeholder='Enter a text prompt e.g "Painting of a cute cat, dramatic lightning"'
            className="input input-bordered input-primary w-full"
          />
          <button
            disabled={generationParameters.prompt.length === 0 || isLoading}
            onClick={onGenerateClickHandler}
            className="btn btn-primary normal-case"
          >
            Generate
          </button>
        </div>
        {/* Note: Setting */}
        {showSetting && (
          <div className="px-8 pt-4 space-y-5">
            <NegativePromptInput
              id="negative_prompt"
              value={generationParameters.negative_prompt}
              onChange={onSettingsChangeHandler}
            />
            <div className="flex justify-between">
              <div className="flex basis-4/5 space-x-6">
                <LabelRangeInput
                  title="Guidance Scale"
                  id="guidance_scale"
                  leftLabel="Prioritize creativity"
                  rightLabel="Prioritize prompt"
                  value={generationParameters.guidance_scale}
                  minValue={1.5}
                  maxValue={10}
                  step={0.5}
                  onChange={onSettingsChangeHandler}
                />
                <LabelRangeInput
                  title="Steps"
                  id="num_inference_steps"
                  leftLabel="Better speed"
                  rightLabel="Better quality"
                  value={generationParameters.num_inference_steps}
                  minValue={10}
                  maxValue={100}
                  step={10}
                  onChange={onSettingsChangeHandler}
                />
                <LabelRangeInput
                  title="Number of Images"
                  id="num_images_per_prompt"
                  leftLabel=""
                  rightLabel=""
                  value={generationParameters.num_images_per_prompt}
                  minValue={1}
                  maxValue={6}
                  step={1}
                  onChange={onSettingsChangeHandler}
                />
              </div>
              <div className="flex justify-end space-x-6">
                <div className="basis-[40%] flex flex-col space-y-1 justify-between">
                  <label className="text-lg font-semibold">Seed</label>
                  <input
                    type="number"
                    placeholder="Seed"
                    min={0}
                    max={10000}
                    value={generationParameters.seed}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      onSettingsChangeHandler("seed", parseInt(event.currentTarget.value))
                    }
                    className="input input-bordered input-sm input-primary w-full"
                  />
                </div>
                <div className="basis-[30%] flex flex-col space-y-1 justify-between">
                  <label className="text-lg font-semibold">Width</label>
                  <input
                    type="number"
                    placeholder="Enter Width"
                    min={32}
                    max={712}
                    value={generationParameters.width}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      onSettingsChangeHandler("width", parseInt(event.currentTarget.value))
                    }
                    className="input input-bordered input-sm input-primary w-full"
                  />
                </div>
                <div className="basis-[30%] flex flex-col space-y-1 justify-between">
                  <label className="text-lg font-semibold">Height</label>
                  <input
                    type="number"
                    placeholder="Enter Height"
                    min={32}
                    max={712}
                    value={generationParameters.height}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      onSettingsChangeHandler("height", parseInt(event.currentTarget.value))
                    }
                    className="input input-bordered input-sm input-primary w-full"
                  />
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col space-y-1 justify-between w-fit">
              <label className="text-lg font-semibold">Seed</label>
              <p className="text-sm">Different seeds produce different images.</p>
              <div className="flex space-x-2">
                <input type="number" placeholder="Type here" className="input input-bordered input-sm input-primary" />
                <button className="btn btn-primary btn-sm normal-case">Generate</button>
              </div>
            </div> */}
          </div>
        )}
      </div>
      {/* Note: Output */}
      <div className="p-8 flex min-h-[350px]">
        {isLoading && <RiseLoader color="#1E293B" size={30} className="m-auto" />}
        {!isLoading && generatedImages.length != 0 && (
          <div className="mx-auto grid grid-cols-2 gap-5">
            {generatedImages.map((image) => (
              <Image
                key={Math.random()}
                src={`data:image/png;base64,${image}`}
                alt="generated image"
                width={512}
                height={512}
                className="w-[512px] h-[512px]"
              />
            ))}
          </div>
        )}
        {!isLoading && generatedImages.length == 0 && (
          <BasicCaptionCard
            title="There is no image yet"
            text='Enter a text prompt and click "Generate", then wait a little bit for the images to be created'
            style="m-auto"
          />
        )}
      </div>
    </div>
  );
};
export default TextToImage;
