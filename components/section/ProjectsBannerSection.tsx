import { FC } from "react";
import Banner from "../ui/Banner";

type ProjectsBannerSectionProps = {
  user: { name: string; email: string; image: string };
};

const ProjectsBannerSection: FC<ProjectsBannerSectionProps> = ({ user }) => {
  return (
    <section className="h-[170px] w-full">
      <Banner>
        <div className="h-full px-10 pb-3 flex items-end">
          <div className="flex-1 flex flex-row gap-5">
            <div className="avatar shadow-2xl">
              <div className="w-32 rounded">
                <img src={user.image} />
              </div>
            </div>
            <div className="flex flex-col justify-start text-primary-content">
              <h3 className="text-2xl mb-[5px] font-semibold">{user.name}</h3>
              <h4 className="text-base mb-[3px] font-normal">{user.email}</h4>
              <span className="text-sm font-normal">Fellow AI Enthusiast</span>
            </div>
          </div>
        </div>
      </Banner>
    </section>
  );
};
export default ProjectsBannerSection;
