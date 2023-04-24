import { Fragment, useEffect, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import ProjectPreviewCard from "../../../components/Card/ProjectPreviewCard";
import ProjectModal from "../../../components/UI/ProjectModal";
import { TypeProject, TypeProjects, TypeUser } from "../../../types/types";
import { generateRandomSeed } from "../../../utils/helpers";
import { Types } from "mongoose";
import BasicCaptionCard from "../../../components/Card/BasicCaptionCard";
import { deleteUserProject } from "../../../utils/api";
import axios from "axios";
import ProjectsBannerSection from "../../../components/Section/ProjectsBannerSection";
import ProjectsSettingsBar from "../../../components/Section/ProjectsSettingsBar";
import Head from "next/head";

const ProjectsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => {
  const [projects, setProjects] = useState<TypeProjects>();

  useEffect(() => {
    axios.get(`/api/users/projects/${user._id}`).then(({ data }) => {
      setProjects(data.data);
      console.log(data.data);
    });
  }, [user._id]);

  const [showModal, setShowModal] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [openedProject, setOpenedProject] = useState<TypeProject | undefined>(undefined);

  const projectCardClickHandler = (projectId: Types.ObjectId | undefined) => {
    const selectedProject = projects?.projects?.find((project) => project._id === projectId);
    setOpenedProject(selectedProject);

    setShowModal(true);
  };

  const deleteProjectClickHandler = async () => {
    setDeleteInProgress(true);
    const response = await deleteUserProject(user._id!, openedProject?._id!);
    const updatedProjects = await response.data.data;
    setProjects(updatedProjects);
    setDeleteInProgress(false);
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Projects | {user.name}</title>
      </Head>

      <ProjectsBannerSection user={user} />
      <ProjectsSettingsBar userId={user._id!} />
      <section className={`${deleteInProgress ? "animate-pulse cursor-not-allowed" : ""} h-full p-10`}>
        <div className={`${deleteInProgress ? "pointer-events-none" : ""} w-full h-full flex flex-wrap gap-10`}>
          {projects?.projects?.length === 0 ? (
            <div className="flex justify-center">
              <BasicCaptionCard title="No projects" text="Navigate to the studio page to create new projects" />
            </div>
          ) : (
            projects?.projects?.map((project) => (
              <Fragment key={generateRandomSeed()}>
                <ProjectPreviewCard onClick={projectCardClickHandler.bind(this, project._id)} project={project} />
              </Fragment>
            ))
          )}
        </div>
      </section>
      {showModal && openedProject && (
        <ProjectModal
          onCloseClick={() => {
            setShowModal(false);
            setOpenedProject(undefined);
          }}
          project={openedProject}
          deleteInProgress={deleteInProgress}
          onDeleteClick={deleteProjectClickHandler}
        />
      )}
    </>
  );
};
export default ProjectsPage;

export const getServerSideProps: GetServerSideProps<{ user: TypeUser }> = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userDataResponse = await axios.get(`${process.env.PUBLIC_BASE_URL}/api/users/by-email/${session.user?.email}`);
  const user: TypeUser = await userDataResponse.data.data;

  return {
    props: { user },
  };
};
