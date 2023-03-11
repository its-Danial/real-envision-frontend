import { FC, useRef, useState } from "react";
import ImageMaskUploadForm from "../../../components/section/ImageMaskUploadForm";
import ImageUploadForm from "../../../components/section/ImageUploadForm";
import Alert from "../../../components/ui/Alert";
import { ImageInpaintingGenerationParameters } from "../../../models/models";
import { createImageMask } from "../../../utils/api";
import { generateRandomSeed } from "../../../utils/constants";

const ImageInpainting: FC = () => {
  const mainScrollRef = useRef<null | HTMLDivElement>(null);

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

  const [generatedImages, setGeneratedImages] = useState([]);
  const [generatedImageIsLoading, setGeneratedImageIsLoading] = useState(false);
  const [maskIsLoading, setMaskIsLoading] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const initialImageSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!uploadedImage) {
      alert("Upload an image");
      return;
    }
    mainScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateImageMaskHandler = async () => {
    if (!uploadedImage) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
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
  };

  const onGenerateClickHandler = async () => {
    setGeneratedImageIsLoading(true);

    setGeneratedImageIsLoading(false);
  };

  const onSettingsChangeHandler = (id: string, value: number | string) => {
    setGenerationParameters((prevState) => {
      return { ...prevState, [id]: value };
    });
    console.log(generationParameters);
  };
  return (
    <div>
      {showAlert && <Alert message="Upload Initial Image first" />}
      {/* note: upload initial image area */}
      <div className="-mt-8 mx-8 h-screen flex items-center justify-center gap-4">
        <ImageUploadForm
          onSubmit={initialImageSubmitHandler}
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
        <ImageMaskUploadForm
          imageMask={imageMask}
          setImageMask={setImageMask}
          onGenerateMaskClick={generateImageMaskHandler}
          maskIsLoading={maskIsLoading}
        />
      </div>
    </div>
  );
};
export default ImageInpainting;
