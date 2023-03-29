import { FC, MutableRefObject } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { RiseLoader } from "react-spinners";
import LabelRangeInput from "../inputs/LabelRangeInput";
import { ImageToImageGenerationParameters, SuperResolutionGenerationParameters } from "../../models/models";

type ImageSettingsSectionProps = {
  uploadedImage: File | null;
  generatedImages: string[];
  isLoading: boolean;
  mainScrollRef: MutableRefObject<HTMLDivElement | null>;
  generationParameters: ImageToImageGenerationParameters | SuperResolutionGenerationParameters;
  onSettingsChangeHandler: (id: string, value: number | string) => void;
  onGenerateClickHandler: () => void;
};

const ImageSettingsSection: FC<ImageSettingsSectionProps> = ({
  uploadedImage,
  generatedImages,
  isLoading,
  mainScrollRef,
  generationParameters,
  onSettingsChangeHandler,
  onGenerateClickHandler,
}) => {
  return (
    <main ref={mainScrollRef} className="flex h-screen">
      {/* note: Show edited Images place */}
      <div className="basis-[70%] flex justify-center items-center">
        <div className="p-5 w-full max-w-[65vw] h-[720px] bg-base-200 border border-base-300 rounded-xl flex items-center justify-center">
          {uploadedImage && generatedImages.length === 0 && !isLoading && (
            <Image
              width={400}
              height={400}
              src={URL.createObjectURL(uploadedImage)}
              alt="uploaded Initial Image"
              className="object-contain h-full w-full"
            />
          )}
          {!uploadedImage && generatedImages.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <BsImages size={40} />
              <p className="text-sm">No initial image yet</p>
            </div>
          )}

          {uploadedImage && isLoading && (
            <div className="flex flex-col items-center justify-center">
              <RiseLoader color="#1E293B" size={30} className="m-auto" />
            </div>
          )}

          {uploadedImage && generatedImages.length !== 0 && !isLoading && (
            <div className="mx-auto h-full w-full flex flex-wrap gap-5">
              {generatedImages.map((image) => (
                <div key={Math.random()} className="">
                  <Image
                    src={`data:image/png;base64,${image}`}
                    alt="generated image"
                    width={512}
                    height={512}
                    className="object-contain h-full w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Note: Generation section */}
      <div className="basis-[30%] py-6 pr-12 flex items-center justify-around overflow-scroll">
        <div className=" w-[326px] flex flex-col gap-4">
          {/* Note: Settings */}
          <div className="p-4 bg-base-200 border border-base-300 rounded-xl space-y-4">
            <h3 className="font-semibold">Settings</h3>
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
            {/* @ts-ignore */}
            {generationParameters.strength && (
              <LabelRangeInput
                title="Strength"
                id="strength"
                leftLabel="More original"
                rightLabel="More modified"
                // @ts-ignore
                value={generationParameters.strength}
                minValue={0.0}
                maxValue={1}
                step={0.05}
                onChange={onSettingsChangeHandler}
              />
            )}
            <div className="space-y-2">
              <label className="font-semibold text-sm">
                Seed <span className="text-[12px] ml-1 font-medium">(Produce different images)</span>
              </label>
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
            <div className="space-y-2">
              <label className="font-semibold text-sm">
                Negative prompt <span className="text-[12px] ml-1 font-medium">(optional)</span>
              </label>
              <input
                value={generationParameters.negative_prompt}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onSettingsChangeHandler("negative_prompt", event.currentTarget.value)
                }
                type="text"
                placeholder="Enter prompts not to guide the image generation"
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
          </div>
          {/* Note: Prompt */}
          <div className="p-4 bg-base-200 border border-base-300 rounded-xl space-y-4">
            <h3 className="font-semibold text-sm">Prompt</h3>
            <input
              value={generationParameters.prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSettingsChangeHandler("prompt", event.currentTarget.value)
              }
              type="text"
              placeholder="Prompts to guide the image generation"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <button
            disabled={generationParameters.prompt.length === 0 || isLoading}
            onClick={onGenerateClickHandler}
            className="btn btn-primary normal-case w-full"
          >
            Generate
          </button>
        </div>
      </div>
    </main>
  );
};
export default ImageSettingsSection;
