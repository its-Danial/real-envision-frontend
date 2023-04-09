import { FC } from "react";
import Banner from "../ui/Banner";

type ProjectsBannerSectionProps = {
  user: { name: string; email: string; image: string };
};

const ProjectsBannerSection: FC<ProjectsBannerSectionProps> = ({ user }) => {
  return (
    <div className="h-48">
      <Banner>
        <div className="h-full p-10 flex items-center">
          <div className="flex-1 flex flex-row gap-5">
            <div className="avatar shadow-2xl">
              <div className="w-25 rounded">
                <img src={user.image} />
              </div>
            </div>
            <div className="flex flex-col justify-center text-info-content">
              <h3 className="text-2xl mb-[5px] font-semibold">{user.name}</h3>
              <h4 className="text-base mb-[3px] font-normal">{user.email}</h4>
              <span className="text-sm font-normal">Fellow AI Enthusiast</span>
            </div>
          </div>
        </div>
      </Banner>
    </div>
  );
};
export default ProjectsBannerSection;
