import { FC } from "react";
import { MdImagesearchRoller } from "react-icons/md";

type GenerateMaskButtonProps = {
  onClick: () => void;
};

const GenerateMaskButton: FC<GenerateMaskButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flex flex-col w-full h-full rounded-xl border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
    >
      <div className="flex flex-col w-full h-full items-center justify-center ">
        <MdImagesearchRoller size={40} />

        <p className="pt-1 text-sm text-gray-400 group-hover:text-gray-600">Generate an Image mask</p>
      </div>
    </button>
  );
};
export default GenerateMaskButton;
