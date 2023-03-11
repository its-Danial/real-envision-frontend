import { FC } from "react";

type UploadedImageBackgroundCardProps = {
  children: React.ReactNode;
};

const UploadedImageBackgroundCard: FC<UploadedImageBackgroundCardProps> = ({ children }) => {
  return (
    <div className="h-full space-y-5 flex flex-col justify-center items-center bg-base-200 border border-base-300 rounded-xl ">
      {children}
    </div>
  );
};
export default UploadedImageBackgroundCard;
