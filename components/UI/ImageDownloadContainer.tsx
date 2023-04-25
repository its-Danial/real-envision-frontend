import { FC } from "react";
import { FiDownload } from "react-icons/fi";
import { saveAs } from "file-saver";

type ImageDownloadContainerProps = {
  children: React.ReactNode;
  style?: string;
  downloadImageData: { byte64Uri: string; fileName: string };
};

const ImageDownloadContainer: FC<ImageDownloadContainerProps> = ({ children, style, downloadImageData }) => {
  const onDownloadButtonClickHandler = () => {
    saveAs(`data:image/jpeg;base64,${downloadImageData.byte64Uri}`, `${downloadImageData.fileName}.jpeg`);
  };

  return (
    <div className={`relative group w-fit h-fit ${style}`}>
      <div className="group-hover:opacity-70">{children}</div>
      <button
        onClick={onDownloadButtonClickHandler}
        className="hidden group-hover:block absolute top-[5%] right-[5%] p-2 bg-primary rounded-lg"
      >
        <FiDownload size={20} className="text-primary-content" />
      </button>
    </div>
  );
};
export default ImageDownloadContainer;
