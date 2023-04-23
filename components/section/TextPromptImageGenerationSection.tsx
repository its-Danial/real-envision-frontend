import { FC, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { ImageInpaintingGenerationParameters, TextToImageGenerationParameters } from "../../types/generationParameter";
import BasicCaptionCard from "../card/BasicCaptionCard";
import LabelRangeInput from "../inputs/LabelRangeInput";
import NegativePromptInput from "../inputs/NegativePromptInput";
import LoadingIndicator from "../ui/LoadingIndicator";
import ImageDownloadContainer from "../ui/ImageDownloadContainer";

type TextPromptImageGenerationSectionProps = {
  generationParameters: TextToImageGenerationParameters | ImageInpaintingGenerationParameters;
  onSettingsChangeHandler: (id: string, value: number | string) => void;
  isLoading: boolean;
  onGenerateClickHandler: () => void;
  generatedImages: string[];
};

const TextPromptImageGenerationSection: FC<TextPromptImageGenerationSectionProps> = ({
  generationParameters,
  onSettingsChangeHandler,
  isLoading,
  onGenerateClickHandler,
  generatedImages,
}) => {
  const [showSetting, setShowSetting] = useState(false);

  return (
    <section>
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
            spellCheck={true}
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
                  maxValue={4}
                  step={1}
                  onChange={onSettingsChangeHandler}
                />
              </div>
              <div className="flex justify-end space-x-6">
                <div className="basis-[40%] flex flex-col space-y-1 justify-between">
                  <label className="text-sm font-semibold">Seed</label>
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
                  <label className="text-sm font-semibold">Width</label>
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
                  <label className="text-sm font-semibold">Height</label>
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
          </div>
        )}
      </div>
      {/* Note: Output */}
      <div className="p-8 flex min-h-[350px]">
        {isLoading && <LoadingIndicator size={30} className="m-auto" />}
        {!isLoading && generatedImages.length != 0 && (
          <div className="h-full w-full overflow-auto grid grid-cols-4 gap-4">
            {generatedImages.map((image, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <ImageDownloadContainer
                key={Math.random()}
                style={`rounded-lg m-auto ${generatedImages.length === 1 ? "col-span-4" : "col-span-2"}`}
              >
                <img
                  src={`data:image/png;base64,${image}`}
                  alt={generationParameters.prompt + ` image_${index}`}
                  className={`rounded-lg m-auto`}
                />
              </ImageDownloadContainer>
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
    </section>
  );
};
export default TextPromptImageGenerationSection;
