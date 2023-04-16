import { FC } from "react";
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
    return `${dateDiff} days's ago`;
  };

  return (
    <div onClick={onClick} className="card w-80 bg-base-100 shadow-xl cursor-pointer">
      <figure className="px-5 pt-5">
        <img
          // src="https://www.rd.com/wp-content/uploads/2020/07/GettyImages-685031953-e1594928609604.jpg"
          src={`data:image/png;base64,${project.images.at(0)}`}
          alt={project.generationParameters.prompt + " image"}
          className="rounded-lg"
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
