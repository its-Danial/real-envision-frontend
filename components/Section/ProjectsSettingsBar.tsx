import { Types } from "mongoose";
import Link from "next/link";
import { FC } from "react";
import { AiOutlineSetting } from "react-icons/ai";

type ProjectsSettingsBarProps = {
  userId: Types.ObjectId;
};

const ProjectsSettingsBar: FC<ProjectsSettingsBarProps> = ({ userId }) => {
  return (
    <section className="flex px-10 pb-1 border-b border-base-300">
      <div className="flex-1 gap-4">
        <div className="flex flex-col">
          <h6 className="font-semibold text-sm text-secondary">Creations</h6>
          <span className="font-normal text-sm text-primary">4</span>
        </div>
      </div>
      <Link href={`/user/settings/${userId}`} legacyBehavior>
        <a className="btn btn-primary btn-sm gap-3 normal-case">
          <AiOutlineSetting size={20} /> Settings
        </a>
      </Link>
    </section>
  );
};
export default ProjectsSettingsBar;
