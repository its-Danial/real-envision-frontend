import { FC, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { BsImages } from "react-icons/bs";
import ImageUploadForm from "../../../components/Inputs/ImageUploadForm";
import LabelRangeInput from "../../../components/Inputs/LabelRangeInput";

const ImageToImage: FC = () => {
  const mainScrollRef = useRef<null | HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [generationParameters, setGenerationParameters] = useState({
    prompt: "",
    strength: 0.8,
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "",
    num_images_per_prompt: 1,
    seed: Math.floor(Math.random() * 10000),
  });

  const [generatedImages, setGeneratedImages] = useState([]);
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
    const fromData = new FormData();
    fromData.append("initial_image", uploadedImage, uploadedImage.name);

    for (const key in generationParameters) {
      // @ts-ignore
      fromData.append(key, generationParameters[key]);
    }

    console.log(fromData.get("strength"));

    const response = await axios.post(`http://127.0.0.1:8000/image-to-image`, fromData);
    const data = await response.data;
    console.log(data);
  };

  return (
    <div>
      {/* note upload image area */}
      <div className="-mt-8 h-screen flex items-center justify-center">
        <ImageUploadForm
          onSubmit={initialImageSubmitHandler}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
      </div>
      <main ref={mainScrollRef} id="main-section" className="flex h-screen">
        {/* note: Show edited Images place */}
        <div className="basis-[70%] flex justify-center items-center">
          <div className="p-5 w-full max-w-[65vw] h-[720px] bg-base-200 border border-base-300 rounded-xl flex items-center justify-center">
            {uploadedImage && (
              <Image
                width={400}
                height={400}
                src={URL.createObjectURL(uploadedImage)}
                alt="uploaded Initial Image"
                className="object-contain h-full w-full"
              />
            )}
            {!uploadedImage && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <BsImages size={40} />
                <p className="text-sm">No initial image yet</p>
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
              <LabelRangeInput
                title="Strength"
                id="strength"
                leftLabel="More original"
                rightLabel="More modified"
                value={generationParameters.strength}
                minValue={0.0}
                maxValue={1}
                step={0.1}
                onChange={onSettingsChangeHandler}
              />
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
    </div>
  );
};
export default ImageToImage;
