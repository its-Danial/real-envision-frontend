import { FC } from "react";
import { RiImageEditFill } from "react-icons/ri";
import { BiCustomize, BiDownload, BiTrash } from "react-icons/bi";
import { ImMagicWand } from "react-icons/im";
import { TextToImageGenerationParameters } from "../../types/generationParameter";
import { ImageInpaintingGenerationParameters } from "../../types/generationParameter";
import { ImageToImageGenerationParameters } from "../../types/generationParameter";
import { SuperResolutionGenerationParameters } from "../../types/generationParameter";
import Param from "./Param";

type ProjectModalProps = {
  onCloseClick: () => void;
  generationParameters:
    | TextToImageGenerationParameters
    | ImageInpaintingGenerationParameters
    | ImageToImageGenerationParameters
    | SuperResolutionGenerationParameters;
};

const ProjectModal: FC<ProjectModalProps> = ({ onCloseClick, generationParameters }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-auto py-3 mx-auto max-w-xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-base-100 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-5 py-4 rounded-t">
              <div className="space-x-3">
                <button className="btn btn-sm btn-primary normal-case gap-2">
                  <RiImageEditFill /> Use as initial Image
                </button>
                <button className="btn btn-sm btn-primary normal-case gap-2">
                  <BiCustomize /> Reuse params
                </button>
                <button className="btn btn-sm btn-primary normal-case gap-2">
                  <ImMagicWand /> Enhance
                </button>
              </div>
              <button className="ml-auto float-right btn btn-sm btn-circle" onClick={onCloseClick}>
                x
              </button>
            </div>
            {/*body (images)*/}
            <div className="relative px-5 py-3 flex-auto border-t border-solid border-base-300">
              <img
                src="https://www.rd.com/wp-content/uploads/2020/07/GettyImages-685031953-e1594928609604.jpg"
                alt=""
              />
            </div>
            {/*Delete and download*/}
            <div className="px-5 pb-3 flex items-center justify-between border-b border-solid border-base-300">
              <button
                className="btn btn-sm ease-linear transition-all duration-150"
                type="button"
                onClick={onCloseClick}
              >
                <BiDownload size={16} />
              </button>
              <button
                className="btn btn-sm ease-linear transition-all duration-150"
                type="button"
                onClick={onCloseClick}
              >
                <BiTrash size={16} />
              </button>
            </div>
            {/*Parameters*/}
            {/* Todo: map all the parameter settings */}
            <div className="px-5 py-4 flex flex-wrap items-center justify-between">
              <div className="w-full grid grid-cols-4 gap-5">
                <Param label="Tool" value="Text to Image" style="col-start-1 col-span-2" />
                <Param label="Tool" value="Text to Image" style="col-start-3 col-span-2" />
                <Param label="Prompt" value="camping tents on a beach with high waves" style="col-start-1 col-end-5" />
                <Param
                  label="Negative Prompt"
                  value="out of frame, duplicate, watermark, signature, text"
                  style="col-start-1 col-end-5"
                />
                <Param label="Resolution" value="512x512" />
                <Param label="Guidance" value="12" />
                <Param label="Number of Images" value="1" />
                <Param label="Seed" value="10849" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-base-300 opacity-40" />
    </>
  );
};
export default ProjectModal;
