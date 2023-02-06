import { useState } from "react";
import Image from "next/image";
import { AiOutlineSetting } from "react-icons/ai";
import RiseLoader from "react-spinners/RiseLoader";
import { generateTextToImage } from "../../../utils/api";
import BasicCaptionCard from "../../../components/Card/BasicCaptionCard";
import LableRangeInput from "../../../components/Inputs/LableRangeInput";

const TextToImage = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showSetting, setShowSetting] = useState(true);

  const onPromptChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    setPrompt(input);
  };

  const onGenerateClickHandler = async () => {
    setIsLoading(true);
    const result = await generateTextToImage(prompt);
    setImage(result.data);
    console.log(image);
    setIsLoading(false);
  };

  const onSettingsClickHandler = () => {
    setShowSetting((prevState) => !prevState);
  };

  return (
    <div>
      {/* Note: Input */}
      <div className="pb-10 border-b border-gray-500 dark:border-gray-600">
        <div className="px-8 flex flex-row space-x-4">
          <label className="btn btn-square rounded-lg swap swap-rotate">
            <input onClick={onSettingsClickHandler} type="checkbox" />
            <AiOutlineSetting className="swap-on fill-current w-[30px] h-[30px]" />
            <AiOutlineSetting className="swap-off fill-current w-[30px] h-[30px]" />
          </label>

          <input
            value={prompt}
            onChange={onPromptChangeHandler}
            type="text"
            placeholder='Enter a text prompt e.g "Painting of a cute cat, dramatic lightning"'
            className="input input-bordered input-primary w-full"
          />
          <button
            disabled={prompt.length === 0}
            onClick={onGenerateClickHandler}
            className="btn btn-primary normal-case"
          >
            Generate
          </button>
        </div>
        {/* Note: Setting */}
        {showSetting && (
          <div className="px-8 pt-4 space-y-5">
            <div className="flex justify-between">
              <div className="flex basis-4/5 space-x-6">
                <LableRangeInput
                  title="Guidance Scale"
                  leftLabel="Prioritize creativity"
                  rightLabel="Prioritize prompt"
                />
                <LableRangeInput title="Steps" leftLabel="Better speed" rightLabel="Better quality" />
                <LableRangeInput title="Number of Images" leftLabel="" rightLabel="" />
              </div>
              <div className="flex justify-end space-x-6">
                <div className="basis-1/3 flex flex-col space-y-1 justify-between">
                  <label className="text-lg font-semibold">Width</label>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered input-sm input-primary w-full"
                  />
                </div>
                <div className="basis-1/3 flex flex-col space-y-1 justify-between">
                  <label className="text-lg font-semibold">Height</label>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered input-sm input-primary w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1 justify-between w-fit">
              <label className="text-lg font-semibold">Seed</label>
              <p className="text-sm">Different seeds produce different images.</p>
              <div className="flex space-x-2">
                <input type="number" placeholder="Type here" className="input input-bordered input-sm input-primary" />
                <button className="btn btn-primary btn-sm normal-case">Generate</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Note: Output */}
      <div className="p-8 ">
        {isLoading && <RiseLoader color="#1E293B" size={20} />}
        {!isLoading && image && (
          <Image
            src={`data:image/png;base64,${image}`}
            alt="generated image"
            width={512}
            height={512}
            className="w-[512px] h-[512px]"
          />
        )}
        {!isLoading && !image && (
          <BasicCaptionCard
            title="There is no image yet"
            text='Enter a text prompt and click "Generate", then wait a little bit for the images to be created'
            style="mx-auto my-12"
          />
        )}
      </div>
    </div>
  );
};
export default TextToImage;
