import { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";
import ImageUploadInput from "../inputs/ImageUploadInput";
import UploadedImageBackgroundCard from "../card/UploadedImageBackgroundCard";

type ImageUploadFormProps = {
  uploadedImage: File | null;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
  onSubmit?: (event: React.FormEvent) => void;
  buttonOptions: React.ReactNode;
};

const ImageUploadForm: FC<ImageUploadFormProps> = ({ uploadedImage, setUploadedImage, onSubmit, buttonOptions }) => {
  const uploadImageHandler = (image: File) => {
    console.log(image);
    setUploadedImage(image);
  };

  return (
    <form className="h-3/4 w-3/4 rounded-2xl" onSubmit={onSubmit}>
      {uploadedImage ? (
        <UploadedImageBackgroundCard>
          <Image
            width={350}
            height={350}
            src={URL.createObjectURL(uploadedImage)}
            alt="uploaded Initial Image"
            className="object-contain h-[80%] w-[80%]"
          />
          {buttonOptions}
        </UploadedImageBackgroundCard>
      ) : (
        <ImageUploadInput onUpload={uploadImageHandler} />
      )}
    </form>
  );
};
export default ImageUploadForm;
