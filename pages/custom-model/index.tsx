import { NextPage } from "next";
import Link from "next/link";

const CustomModel: NextPage = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto max-w-5xl px-2">
        {/* Caption */}
        <div className="py-10 text-center">
          <h1 className="font-semibold text-5xl">Building a Diffusion Model</h1>
          <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
            Here I will cover how a basic diffusion model can be built
          </p>
        </div>
        <div className="w-full mx-auto max-w-4xl pt-14 border-t border-base-300">
          {/* Introduction */}
          <div id="introduction" className="space-y-4">
            <h2 className="font-semibold text-3xl">Introduction</h2>
            <p>
              I&apos;m going to build a very simple Diffusion model for generating landscape images. This is to
              demonstrate the core functionalities and idea behind how diffusion models generate images.
            </p>
            <p>Papers on diffusion models that were used for this are the following</p>
            {/* Research papers */}
            <ul className="list-disc list-inside">
              <Link href="https://arxiv.org/pdf/2105.05233.pdf">
                <li>
                  <span className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                    [Dhariwal, Nichol, 2021]
                  </span>
                </li>
              </Link>
              <Link href="https://arxiv.org/pdf/2006.11239.pdf">
                <li>
                  <span className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                    [Ho et al., 2020] ect.
                  </span>
                </li>
              </Link>
            </ul>
            <p>
              This model has been trained on Google colab on free tier and use to its usage limit I was not able to
              train the model long enough to produce high quality results. However the results produced are sufficient
              for demonstrating a custom diffusion model.
            </p>
            <p>
              For the custom model I have used a Landscape classification dataset. This data consists of 5 different
              classes. Each class representing a kind of landscape. These classes are: <strong>Coast</strong>,{" "}
              <strong>Desert</strong>, <strong>Forest</strong>, <strong>Glacier</strong>, <strong>Mountains</strong>
            </p>
            <p>
              Source:{" "}
              <Link
                href="https://www.kaggle.com/datasets/utkarshsaxenadn/landscape-recognition-image-dataset-12k-images"
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                Kaggle
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomModel;
