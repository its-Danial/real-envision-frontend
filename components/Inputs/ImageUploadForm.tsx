import { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";
import ImageUploadInput from "./ImageUploadInput";

type ImageUploadFormProps = {
  uploadedImage: File | null;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
  onSubmit: (event: React.FormEvent) => void;
};

const ImageUploadForm: FC<ImageUploadFormProps> = ({ uploadedImage, setUploadedImage, onSubmit }) => {
  const uploadImageHandler = (image: File) => {
    console.log(image);
    setUploadedImage(image);
    // mainScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form className="h-3/4 w-3/4 rounded-2xl" onSubmit={onSubmit}>
      {uploadedImage && (
        <div className="h-full space-y-5 flex flex-col justify-center items-center bg-base-200 border border-base-300 rounded-xl ">
          <Image
            width={350}
            height={350}
            src={URL.createObjectURL(uploadedImage)}
            alt="uploaded Initial Image"
            className="object-contain h-[80%] w-[80%]"
          />
          <div className="space-x-4">
            <button className="btn btn-primary btn-sm mx-auto normal-case w-44" onClick={() => setUploadedImage(null)}>
              Remove
            </button>
            <button className="btn btn-primary btn-sm mx-auto normal-case w-44" type="submit">
              Submit
            </button>
          </div>
        </div>
      )}
      {!uploadedImage && <ImageUploadInput onUpload={uploadImageHandler} />}
    </form>
  );
};
export default ImageUploadForm;
