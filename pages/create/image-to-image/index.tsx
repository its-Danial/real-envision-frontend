import { FC, useState, useRef } from "react";
import Image from "next/image";
import ImageUploadInput from "../../../components/Inputs/ImageUploadInput";

const ImageToImage: FC = () => {
  const mainScrollRef = useRef<null | HTMLDivElement>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const uploadImageHandler = (image: File) => {
    console.log(image);
    setUploadedImage(image);
    mainScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* note upload image area */}
      <div className="-mt-8 h-screen  flex items-center justify-center">
        <div className="h-3/4 w-3/4 shadow-xl rounded-2xl">
          {uploadedImage && (
            <div className="h-full space-y-5 flex flex-col justify-center">
              <div className="w-full flex rounded-lg bg-base-200 h-[400px]">
                <Image
                  width={350}
                  height={350}
                  src={URL.createObjectURL(uploadedImage)}
                  alt="uploaded Initial Image"
                  className="m-auto h-[350px] object-contain"
                />
              </div>
              <div className="flex">
                <button className="btn btn-primary mx-auto normal-case w-44" onClick={() => setUploadedImage(null)}>
                  Remove
                </button>
              </div>
            </div>
          )}
          {!uploadedImage && <ImageUploadInput onUpload={uploadImageHandler} />}
        </div>
      </div>
      <main ref={mainScrollRef} id="main-section" className="flex h-screen">
        {/* note: Show edited Images place */}
        <div className="basis-[70%] bg-slate-200"></div>
        {/* Note: show settings */}
        <div className="basis-[30%]"></div>
      </main>
    </div>
  );
};
export default ImageToImage;
