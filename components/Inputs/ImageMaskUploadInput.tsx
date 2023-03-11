import { FC } from "react";
import { MdCloudUpload, MdImagesearchRoller } from "react-icons/md";

type ImageMaskUploadInputProps = {
  onClick: (image: File) => void;
};

const ImageMaskUploadInput: FC<ImageMaskUploadInputProps> = ({ onClick }) => {
  return (
    <label className="cursor-pointer flex flex-col w-full h-full rounded-xl border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
      <div className="flex flex-col w-full h-full items-center justify-center ">
        <MdCloudUpload size={40} />

        <p className="pt-1 text-sm text-gray-400 group-hover:text-gray-600">Upload an image mask</p>
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
