import { Types } from "mongoose";
import Link from "next/link";
import { FC } from "react";
import { BiCustomize, BiDownload, BiTrash } from "react-icons/bi";
import { ImMagicWand } from "react-icons/im";
import { RiImageEditFill } from "react-icons/ri";
import { generateRandomSeed } from "../../utils/helpers";
import Param from "./Param";
import useFetch from "../../hooks/useFetch";
import { TypeProject } from "../../types/types";
import LoadingIndicator from "./LoadingIndicator";

type ProjectModalProps = {
  onCloseClick: () => void;
  onDeleteClick: () => void;
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  deleteInProgress: boolean;
};

const ProjectModal: FC<ProjectModalProps> = ({ onCloseClick, onDeleteClick, userId, projectId, deleteInProgress }) => {
  // const { generationParameters } = project;
  const { data, error } = useFetch<{ success: boolean; data: TypeProject }>(
    `/api/users/projects/${userId}/${projectId}`,
    "GET"
  );

  const project = data?.data;

  return (
    <>
      <div
        className={`${
          deleteInProgress ? "animate-pulse pointer-events-none" : ""
        } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        <div
          className={`${deleteInProgress ? "cursor-not-allowed" : ""} relative w-auto my-auto py-3 mx-auto max-w-xl`}
        >
          {/*content*/}
          {project ? (
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-base-100 outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between px-5 py-4 rounded-t">
                <div className="space-x-3">
                  <Link href={{ pathname: "/create/text-to-image", query: { projectId: String(project._id) } }}>
                    <button disabled={deleteInProgress} className="btn btn-sm btn-primary normal-case gap-2">
                      <BiCustomize /> Reuse params
                    </button>
                  </Link>
                  <Link href={{ pathname: "/create/image-to-image", query: { projectId: String(project._id) } }}>
                    <button disabled={deleteInProgress} className="btn btn-sm btn-primary normal-case gap-2">
                      <RiImageEditFill /> Use as initial Image
                    </button>
                  </Link>

                  <button disabled={deleteInProgress} className="btn btn-sm btn-primary normal-case gap-2">
                    <ImMagicWand /> Enhance
                  </button>
                </div>
                <button className="ml-auto float-right btn btn-sm btn-circle" onClick={onCloseClick}>
                  x
                </button>
              </div>
              {/* body (images) */}
              <div className="relative px-5 py-3 flex-auto border-t border-solid border-base-300">
                {project.images.map((imageString) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={generateRandomSeed()}
                    src={`data:image/png;base64,${imageString}`}
                    alt={project.generationParameters.prompt + " image"}
                  />
                ))}
              </div>
              {/*Delete and download*/}
              <div className="px-5 pb-3 flex items-center justify-between border-b border-solid border-base-300">
                <button
                  disabled={deleteInProgress}
                  className="btn btn-sm ease-linear transition-all duration-150"
                  type="button"
                  onClick={onCloseClick}
                >
                  <BiDownload size={16} />
                </button>
                <button
                  disabled={deleteInProgress}
                  className="btn btn-sm ease-linear transition-all duration-150"
                  type="button"
                  onClick={onDeleteClick}
                >
                  <BiTrash size={16} />
                </button>
              </div>
              {/*Parameters*/}
              {/* Todo: map all the parameter settings */}
              <div className="px-5 py-4 flex flex-wrap items-center justify-between">
                <div className="w-full grid grid-cols-4 gap-5">
                  <Param label="Tool" value={project.tool} style="col-start-1 col-span-2" />
                  <Param label="Model" value={project.model} style="col-start-3 col-span-2" />
                  <Param label="Prompt" value={project.generationParameters.prompt} style="col-start-1 col-end-5" />
                  <Param
                    label="Negative Prompt"
                    value={
                      project.generationParameters.negative_prompt.length === 0
                        ? "Not specified"
                        : project.generationParameters.negative_prompt
                    }
                    style="col-start-1 col-end-5"
                  />
                  {/* @ts-ignore */}
                  {project.generationParameters.width && (
                    <Param
                      label="Resolution"
                      // @ts-ignore
                      value={`${project.generationParameters.width}x${project.generationParameters.height}`}
                    />
                  )}
                  {/* @ts-ignore */}
                  {project.generationParameters.strength && (
                    // @ts-ignore
                    <Param label="Strength" value={project.generationParameters.strength} />
                  )}
                  <Param label="Guidance" value={project.generationParameters.guidance_scale} />
                  <Param label="Number of Images" value={project.generationParameters.num_images_per_prompt} />
                  <Param label="Seed" value={project.generationParameters.seed} />
                </div>
              </div>
            </div>
          ) : (
            <LoadingIndicator className="mx-auto" size={30} />
          )}
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-base-300 opacity-40" />
    </>
  );
};
export default ProjectModal;
