import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { getServerSession } from "next-auth";
import ProjectsBannerSection from "../../../components/section/ProjectsBannerSection";
import ProjectsSettingsBar from "../../../components/section/ProjectsSettingsBar";
import { authOptions } from "../../api/auth/[...nextauth]";
import ProjectPreviewCard from "../../../components/card/ProjectPreviewCard";
import ProjectModal from "../../../components/ui/ProjectModal";
import { useState } from "react";

const ProjectsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const projectCardClickHandler = () => {
    setShowModal(true);
  };

  const TEST_GENERATION_PARAMETERS = {
    prompt: "Hello world",
    height: 512,
    width: 512,
    num_inference_steps: 50,
    guidance_scale: 8.5,
    negative_prompt: "Hello world",
    num_images_per_prompt: 1,
    seed: 1000,
  };

  return (
    <div>
      <ProjectsBannerSection user={user} />
      <ProjectsSettingsBar />
      <section className="h-full p-10 flex flex-wrap gap-10">
        <ProjectPreviewCard onClick={projectCardClickHandler} />
        <ProjectPreviewCard onClick={projectCardClickHandler} />
        <ProjectPreviewCard onClick={projectCardClickHandler} />
        <ProjectPreviewCard onClick={projectCardClickHandler} />
      </section>
      {showModal && (
        <ProjectModal onCloseClick={() => setShowModal(false)} generationParameters={TEST_GENERATION_PARAMETERS} />
      )}
    </div>
  );
};
export default ProjectsPage;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { user } = session;

  return {
    props: { user },
  };
};
