import { Fragment, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import ProjectsBannerSection from "../../../components/section/ProjectsBannerSection";
import ProjectsSettingsBar from "../../../components/section/ProjectsSettingsBar";
import { authOptions } from "../../api/auth/[...nextauth]";
import ProjectPreviewCard from "../../../components/card/ProjectPreviewCard";
import ProjectModal from "../../../components/ui/ProjectModal";
import { NextAPIClient } from "../../../utils/axiosClient";
import { TypeProject, TypeProjects, TypeUser } from "../../../types/types";
import { generateRandomSeed } from "../../../utils/helpers";
import { Types } from "mongoose";

const ProjectsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user, projects }) => {
  const [showModal, setShowModal] = useState(false);
  const [openedProject, setOpenedProject] = useState<TypeProject | undefined>(undefined);

  const projectCardClickHandler = (projectId: Types.ObjectId | undefined) => {
    const selectedProject = projects.projects.find((project) => project._id === projectId);
    setOpenedProject(selectedProject);

    setShowModal(true);
  };

  return (
    <div>
      <ProjectsBannerSection user={user} />
      <ProjectsSettingsBar userId={user._id!} />
      <section className="h-full p-10 flex flex-wrap gap-10">
        {projects.projects.map((project) => (
          <Fragment key={generateRandomSeed()}>
            <ProjectPreviewCard onClick={projectCardClickHandler.bind(this, project._id)} project={project} />
          </Fragment>
        ))}
      </section>
      {showModal && openedProject && <ProjectModal onCloseClick={() => setShowModal(false)} project={openedProject} />}
    </div>
  );
};
export default ProjectsPage;

export const getServerSideProps: GetServerSideProps<{ user: TypeUser; projects: TypeProjects }> = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userDataResponse = await NextAPIClient.get(`/api/users/by-email/${session.user?.email}`);
  const user: TypeUser = await userDataResponse.data.data;

  const userProjectResponse = await NextAPIClient.get(`/api/users/projects/${user._id}`);
  const projects: TypeProjects = await userProjectResponse.data.data;

  return {
    props: { user, projects },
  };
};
