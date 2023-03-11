import { FC } from "react";
import { MdCloudUpload } from "react-icons/md";

type ImageMaskUploadInputProps = {
  onClick: (image: File) => void;
};

const ImageMaskUploadInput: FC<ImageMaskUploadInputProps> = ({ onClick }) => {
  return (
    <label className="upload-image-card">
      <div className="flex flex-col w-full h-full items-center justify-center ">
        <MdCloudUpload size={40} />
        <p className="pt-1 text-sm text-base-content">Upload an image mask</p>
      </div>
      <input
        type="file"
        accept=".jpeg, .png, .jpg"
        className="opacity-0 cursor-pointer"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (!event.target.files) return;
          onClick(event.target.files[0]);
        }}
      />
    </label>
  );
};
export default ImageMaskUploadInput;
