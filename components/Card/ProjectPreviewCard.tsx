import { FC } from "react";
import Image from "next/image";
import { TypeProject } from "../../types/types";
import { dateDiffInDays } from "../../utils/helpers";

type ProjectPreviewCardProps = {
  onClick: () => void;
  project: TypeProject;
};

const ProjectPreviewCard: FC<ProjectPreviewCardProps> = ({ onClick, project }) => {
  const getTimeStamp = () => {
    const dateDiff = dateDiffInDays(new Date(project.timeStamp), new Date());
    if (dateDiff === 0) {
      return "Today";
    }
    return `${dateDiff} days ago`;
  };

  return (
    <div onClick={onClick} className="card w-80 bg-base-100 shadow-xl cursor-pointer">
      <figure className="px-5 pt-5">
        <Image
          src={`data:image/jpeg;base64,${project.images.at(0)}`}
          alt={project.generationParameters.prompt + " image"}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto rounded-lg"
        />
      </figure>
      <div className="card-body px-5 py-4 gap-1">
        <div className="flex flex-row items-center justify-between">
          <h2 className="card-title text-base">{project.tool}</h2>
          <span className="text-xs font-light">{getTimeStamp()}</span>
        </div>
        <p className="text-sm">{project.generationParameters.prompt}</p>
      </div>
    </div>
  );
};
export default ProjectPreviewCard;
