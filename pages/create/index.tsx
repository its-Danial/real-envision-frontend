import { RoughNotation } from "react-rough-notation";
import StudioCreateCard from "../../components/Card/StudioCreateCard";
import textToImageImg from "../../public/assets/studio/models/text-to-image.svg";
import imageToImage from "../../public/assets/studio/models/image-to-image.svg";
import inpaintingImg from "../../public/assets/studio/models/inpainting.svg";
import superResolutionImg from "../../public/assets/studio/models/super-resolution.svg";

const Create = () => {
  return (
    <div className="mb-8 flex flex-col items-center justify-center space-y-7">
      <h1 className="text-3xl font-bold">
        Pick the magic of generative{" "}
        <RoughNotation type="underline" show>
          Diffusion Model
        </RoughNotation>
      </h1>
      <div className="grid grid-cols-3 gap-5 gap-y-8">
        <StudioCreateCard
          title="Text to Image"
          description="Text-to-Image understand your words and convert them to a unique image each time."
          imgSrc={textToImageImg}
          imgAlt="Text to Image model card image"
          href="/create/text-to-image"
        />
        <StudioCreateCard
          title="Image to Image"
          description="Image-to-Image lets you upload an initial image and manipulate or alter it according to a text prompt."
          imgSrc={imageToImage}
          imgAlt="Image to Image model card image"
          href="/create/image-to-image"
        />
        <StudioCreateCard
          title="Image Inpainting"
          description="Inpainting allows you to modify a specific section of an image by selecting a specific area of an image, and then generating new details based on a provided text prompt."
          imgSrc={inpaintingImg}
          imgAlt="Inpainting model card image"
          href="/create/image-inpainting"
        />

        <div className="col-start-1 col-end-4 mx-auto">
          <StudioCreateCard
            title="Super Resolution"
            description="Allow you to enhance (increase) the resolution of images such as old pictures"
            imgSrc={superResolutionImg}
            imgAlt="Super Resolution model card image"
            href="/create/super-resolution"
          />
        </div>
      </div>
    </div>
  );
};
export default Create;
