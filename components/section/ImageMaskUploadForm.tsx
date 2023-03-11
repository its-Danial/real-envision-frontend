import { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";
import ImageMaskUploadInput from "../inputs/ImageMaskUploadInput";
import GenerateMaskButton from "../inputs/GenerateMaskButton";
import UploadedImageBackgroundCard from "../card/UploadedImageBackgroundCard";
import { RiseLoader } from "react-spinners";

type ImageMaskUploadFormProps = {
  imageMask: File | string | null;
  setImageMask: Dispatch<SetStateAction<string | File | null>>;
  onGenerateMaskClick: () => void;
  maskIsLoading: boolean;
};

const ImageMaskUploadForm: FC<ImageMaskUploadFormProps> = ({
  imageMask,
  setImageMask,
  onGenerateMaskClick,
  maskIsLoading,
}) => {
  const uploadImageHandler = (image: File) => {
    console.log(image);
    setImageMask(image);
  };

  return (
    <div className="h-3/4 w-3/4 rounded-2xl flex flex-col gap-2">
      {imageMask ? (
        <UploadedImageBackgroundCard>
          <Image
            width={350}
            height={350}
            src={typeof imageMask === "object" ? URL.createObjectURL(imageMask) : `data:image/png;base64,${imageMask}`}
            alt="Image Mask"
            className="object-contain h-[80%] w-[80%]"
          />
        </UploadedImageBackgroundCard>
      ) : maskIsLoading ? (
        <UploadedImageBackgroundCard>
          <RiseLoader color="#1E293B" size={30} className="m-auto" />
        </UploadedImageBackgroundCard>
      ) : (
        <>
          <ImageMaskUploadInput onClick={uploadImageHandler} />
          <h4 className="text-center font-semibold ">OR</h4>
          <GenerateMaskButton onClick={onGenerateMaskClick} />
        </>
      )}
    </div>
  );
};
export default ImageMaskUploadForm;
