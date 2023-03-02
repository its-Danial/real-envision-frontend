import { FC } from "react";
import { MdCloudUpload } from "react-icons/md";

type ImageUploadInputProps = {
  onUpload: (image: File) => void;
};

const ImageUploadInput: FC<ImageUploadInputProps> = ({ onUpload }) => {
  return (
    <label className="cursor-pointer flex flex-col w-full h-full rounded-xl border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
      <div className="flex flex-col w-full h-full items-center justify-center ">
        <MdCloudUpload size={40} />
        <p className="pt-1 text-sm text-gray-400 group-hover:text-gray-600">Upload an initial Image</p>
      </div>
      <input
        type="file"
        accept=".jpeg, .png, .jpg"
        className="opacity-0 cursor-pointer"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (!event.target.files) return;
          onUpload(event.target.files[0]);
        }}
      />
    </label>
  );
};
export default ImageUploadInput;
