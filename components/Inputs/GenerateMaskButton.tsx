import { FC } from "react";
import { MdImagesearchRoller } from "react-icons/md";

type GenerateMaskButtonProps = {
  onClick: () => void;
};

const GenerateMaskButton: FC<GenerateMaskButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="upload-image-card">
      <div className="flex flex-col w-full h-full items-center justify-center ">
        <MdImagesearchRoller size={40} />
        <p className="pt-1 text-sm text-base-content">Generate an Image mask</p>
      </div>
    </button>
  );
};
export default GenerateMaskButton;
