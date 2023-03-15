import { FC, useRef, useState } from "react";
import ImageMaskUploadSection from "../../../components/section/ImageMaskUploadSection";
import ImageUploadForm from "../../../components/section/ImageUploadForm";
import TextPromptImageGenerationSection from "../../../components/section/TextPromptImageGenerationSection";
import Alert from "../../../components/ui/Alert";
import { ImageInpaintingGenerationParameters } from "../../../models/models";
import { createImageMask } from "../../../utils/api";
import { generateRandomSeed } from "../../../utils/constants";

const ImageInpainting: FC = () => {
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(AlertMessage.InitialImageMissing);

  const uploadImageMaskHandler = (image: File) => {
    if (!uploadedImage) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
    console.log(image);
    setImageMask(image);

    generationSectionScrollRef.current?.scrollIntoView({ behavior: "smooth" });
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
      setAlertMessage(AlertMessage.BothImagesMissing);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage(AlertMessage.InitialImageMissing);
      }, 3000);
      return;
    }
    setGeneratedImageIsLoading(true);
    setGeneratedImageIsLoading(false);
  };
  return (
    <main>
      {showAlert && <Alert message={alertMessage} />}
      {/* note: upload initial image area */}
      <div className="-mt-8 mx-8 h-screen flex items-center justify-center gap-4">
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

      <div ref={generationSectionScrollRef} className="h-screen scroll-mt-8">
        <TextPromptImageGenerationSection
          generatedImages={generatedImages}
          generationParameters={generationParameters}
          isLoading={generatedImageIsLoading}
          onGenerateClickHandler={onGenerateClickHandler}
          onSettingsChangeHandler={onSettingsChangeHandler}
        />
      </div>
    </main>
  );
};
export default ImageInpainting;
