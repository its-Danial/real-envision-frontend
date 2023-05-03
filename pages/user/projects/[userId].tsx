import axios from "axios";
import { Types } from "mongoose";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import BasicCaptionCard from "../../../components/Card/BasicCaptionCard";
import ProjectPreviewCard from "../../../components/Card/ProjectPreviewCard";
import ProjectsBannerSection from "../../../components/Section/ProjectsBannerSection";
import ProjectsSettingsBar from "../../../components/Section/ProjectsSettingsBar";
import Alert from "../../../components/UI/Alert";
import LoadingIndicator from "../../../components/UI/LoadingIndicator";
import ProjectModal from "../../../components/UI/ProjectModal";
import useFetch from "../../../hooks/useFetch";
import { TypeProjects, TypeUser } from "../../../types/types";
import { deleteUserProject } from "../../../utils/api";
import { generateRandomSeed } from "../../../utils/helpers";
import { authOptions } from "../../api/auth/[...nextauth]";

const ProjectsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => {
  const { data, error } = useFetch<{ success: boolean; data: TypeProjects }>(`/api/users/projects/${user._id}`, "GET");

  console.log("fetched projects", data);

  const [projects, setProjects] = useState<TypeProjects>();

  useEffect(() => {
    if (!data?.data) return;
    setProjects(data.data);
  }, [data?.data]);

  const [showModal, setShowModal] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [openedProjectId, setOpenedProjectId] = useState<Types.ObjectId | undefined>(undefined);

  const projectCardClickHandler = (projectId: Types.ObjectId | undefined) => {
    // const selectedProject = projects?.projects?.find((project) => project._id === projectId);
    setOpenedProjectId(projectId);

    setShowModal(true);
  };

  const deleteProjectClickHandler = async () => {
    setDeleteInProgress(true);
    const response = await deleteUserProject(user._id!, openedProjectId!);
    const data = await response.data;
    const updatedProjects = await data.data;
    console.log("updated projects", updatedProjects);

    setProjects(updatedProjects);
    setDeleteInProgress(false);
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Projects | {user.name}</title>
      </Head>

      {error && <Alert message={error.message} type="error" />}

      <ProjectsBannerSection user={user} />
      <ProjectsSettingsBar userId={user._id!} />
      <section className={`${deleteInProgress ? "animate-pulse cursor-not-allowed" : ""} h-full p-10`}>
        <div className={`${deleteInProgress ? "pointer-events-none" : ""} w-full h-full flex flex-wrap gap-10`}>
          {data ? (
            projects?.projects?.length === 0 ? (
              <div className="flex justify-center">
                <BasicCaptionCard title="No projects" text="Navigate to the studio page to create new projects" />
              </div>
            ) : (
              projects?.projects?.map((project) => (
                <Fragment key={generateRandomSeed()}>
                  <ProjectPreviewCard onClick={projectCardClickHandler.bind(this, project._id)} project={project} />
                </Fragment>
              ))
            )
          ) : (
            <LoadingIndicator className="mx-auto mt-40" size={40} />
          )}
        </div>
      </section>
      {showModal && openedProjectId && (
        <ProjectModal
          onCloseClick={() => {
            setShowModal(false);
            setOpenedProjectId(undefined);
          }}
          userId={user._id!}
          projectId={openedProjectId}
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
