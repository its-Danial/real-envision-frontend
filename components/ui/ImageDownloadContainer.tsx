import Link from "next/link";
import { FC } from "react";
import { FiDownload } from "react-icons/fi";

type ImageDownloadContainerProps = {
  children: React.ReactNode;
  style?: string;
};

const ImageDownloadContainer: FC<ImageDownloadContainerProps> = ({ children, style }) => {
  return (
    <div className={`relative group w-fit h-fit ${style}`}>
      <div className="group-hover:opacity-70">{children}</div>
      <Link href="/" className="hidden group-hover:block absolute top-[5%] right-[5%] p-2 bg-primary rounded-lg">
        <FiDownload size={20} className="text-primary-content" />
      </Link>
    </div>
  );
};
export default ImageDownloadContainer;
