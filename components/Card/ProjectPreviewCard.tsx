import { FC } from "react";

type ProjectPreviewCardProps = {
  onClick: () => void;
};

const ProjectPreviewCard: FC<ProjectPreviewCardProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="card w-80 bg-base-100 shadow-xl cursor-pointer">
      <figure className="px-5 pt-5">
        <img
          src="https://www.rd.com/wp-content/uploads/2020/07/GettyImages-685031953-e1594928609604.jpg"
          alt=""
          className="rounded-lg"
        />
      </figure>
      <div className="card-body px-5 py-4 gap-1">
        <div className="flex flex-row items-center justify-between">
          <h2 className="card-title text-base">Text to Image</h2>
          <span className="text-xs font-light">a week ago</span>
        </div>
        <p className="text-sm">Green Nike sports running shoe</p>
      </div>
    </div>
  );
};
export default ProjectPreviewCard;
