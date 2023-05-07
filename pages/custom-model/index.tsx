import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { CodeBlock, dracula } from "react-code-blocks";
import simulate_forward_diffusion_image from "../../public/assets/custom-model/simulate_forward_diffusion.png";
import result_1 from "../../public/assets/custom-model/results/result_1.png";
import result_2 from "../../public/assets/custom-model/results/result_2.png";
import result_3 from "../../public/assets/custom-model/results/result_3.png";

const CustomModel: NextPage = () => {
  const researchPapers = [
    {
      authors: "[Dhariwal, Nichol, 2021]",
      title: "Diffusion Models Beat GANs on Image Synthesis",
      href: "https://arxiv.org/pdf/2105.05233.pdf",
    },
    {
      authors: "[Ho et al., 2020] ect.",
      title: "Denoising Diffusion Probabilistic Models",
      href: "https://arxiv.org/pdf/2006.11239.pdf",
    },
    {
      authors: "[Dhariwal, Nichol, 2021]",
      title: "Improved Denoising Diffusion Probabilistic Models",
      href: "https://arxiv.org/pdf/2102.09672.pdf",
    },
  ];

  const cosine_beta_schedule_py = `def cosine_variance_schedular(timesteps, s=0.008):
    steps = timesteps + 1
    x = torch.linspace(0, timesteps, steps)
    alphas_cumprod = torch.cos(((x / timesteps) + s) / (1 + s) * torch.pi * 0.5) ** 2
    alphas_cumprod = alphas_cumprod / alphas_cumprod[0]
    betas = 1 - (alphas_cumprod[1:] / alphas_cumprod[:-1])
    return torch.clip(betas, 0.0001, 0.9999)`;

  const get_loss_py = `def get_loss(model, x_0, t): 
    x_noisy, noise = forward_diffusion_sample(x_0, t, DEVICE)
    noise_pred = model(x_noisy, t)
    return torch.nn.functional.l1_loss(noise, noise_pred)`;

  const training_py = `model.to(DEVICE)
optimizer = Adam(model.parameters(), lr=0.001)
epochs = 500
  
for epoch in range(epochs):
    pbar = tqdm(dataloader)
    for step, batch in enumerate(pbar):
      optimizer.zero_grad()
  
      t = torch.randint(0, T, (BATCH_SIZE,), device=DEVICE).long()
      loss = get_loss(model, batch[0], t)
      loss.backward()
      optimizer.step()
  
      if epoch % 10 == 0 and step == 0:
        print(f"Epoch {epoch} | step {step:03d} Loss: {loss.item()} ")
        sample_plot_image()`;

  return (
    <>
      <Head>
        <title>Custom Model | RealEnvision</title>
      </Head>
      <div className="min-h-screen">
        <div className="w-full mx-auto max-w-5xl px-2">
          {/* Caption */}
          <div className="py-10 text-center">
            <h1 className="font-semibold text-5xl">Building a Diffusion Model</h1>
            <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
              Here I will cover how a basic diffusion model can be built
            </p>
          </div>
          <main className="w-full mx-auto max-w-4xl pt-14 border-t border-base-300">
            {/* Introduction */}
            <section id="introduction" className="space-y-4 mb-6">
              <h2 className="font-semibold text-3xl">Introduction</h2>
              <p>
                On this page I&apos;m going to showcase the result form a very simple diffusion model for generating
                landscape images and the steps that were necessary to implement it. This is to demonstrate the idea
                behind how diffusion models work.
              </p>
              <p>Papers on diffusion models that were used for this are the following</p>
              {/* Research papers */}
              <ul className="list-disc list-inside">
                {researchPapers.map((paper) => (
                  <Link href={paper.href!} key={paper.title}>
                    <li className="marker:text-primary underline text-blue-600 dark:text-blue-400 hover:text-blue-700">
                      {paper.title}, <span>{paper.authors}</span>
                    </li>
                  </Link>
                ))}
              </ul>
              <p>
                The model has been trained on Google Colab free tier and due to its usage limit I was not able to train
                the model long enough to produce very high quality results. However the results produced are sufficient
                for demonstrating a custom diffusion model.
              </p>
              <p>
                For the custom model I have used a Landscape classification dataset. This data consists of 5 different
                classes. Each class representing a kind of landscape. These classes are the following:{" "}
                <strong>Coast</strong>, <strong>Desert</strong>, <strong>Forest</strong>, <strong>Glacier</strong>,{" "}
                <strong>Mountains</strong>.
                <br />
                Source:{" "}
                <Link
                  href="https://www.kaggle.com/datasets/utkarshsaxenadn/landscape-recognition-image-dataset-12k-images"
                  className="underline text-blue-600 dark:text-blue-400 hover:text-blue-700"
                >
                  Kaggle
                </Link>
              </p>
              <h5 className="font-semibold text-xl">Overview:</h5>
              <p>
                Diffusion models work in a Markov chain of diffusion steps (timesteps) where they slowly add random
                noise to image, this is know as the <u>forward process</u>. Then they learn to reverse the diffusion
                process using a neural network to recover image from the noise, this is also called the{" "}
                <u>backward process</u>.
              </p>
              <p>
                The task of the model can be described as predicting the noise that was added in each of the images and
                that is why we use a neural network for it. The papers recommend using a <strong>U-Net</strong> for
                this. In order to generate new unique images we can simply perform the backward process from random
                noise and new images points are constructed.
              </p>
              <h5 className="font-semibold text-xl">How to implement:</h5>
              <p>For a simple implementation mainly three things are needed</p>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Noise Scheduler</strong>: which sequentially adds noise.
                </li>
                <li>
                  <strong>Neural Network</strong>: that predicts the noise.
                </li>
                <li>
                  <strong>Timestep Encoding</strong>: a way to encode the current timestep.
                </li>
              </ul>
            </section>
            {/* Part One */}
            <section id="partOne" className="space-y-4 mb-6">
              <h2 className="font-semibold text-3xl">Part 1: Noise scheduler for the forwards process</h2>
              <p>
                First we need to create the inputs for the model which are more and more noisy images. Instead of doing
                this in a sequential manner, we can calculate the image for any of the timesteps individually as
                provided in the papers and use it for sampling. There is no model needed for this part.
              </p>
              <h5 className="font-semibold">Key points:</h5>
              <ul className="list-disc list-inside">
                <li>The noise-levels can be pre-computed</li>
              </ul>
              <p>
                <strong>Note:</strong> The original paper proposed the used of a <u>liner variance schedular</u> for
                adding nose to the images, however later papers found that this destroyed the images too quickly and
                instead introduced a <u>cosine-based variance schedule</u> which prevented the image from being
                noised/destroyed too quickly. This is what I have used im my implementation.
              </p>
              <div className="font-mono text-sm">
                <CodeBlock text={cosine_beta_schedule_py} language="python" showLineNumbers={true} theme={dracula} />
              </div>
              <h5 className="font-semibold text-xl">A Simulation of a forward diffusion process:</h5>
              <Image src={simulate_forward_diffusion_image} alt="simulate_forward_diffusion_image" />
            </section>
            {/* Part Two */}
            <section id="partTwo" className="space-y-4 mb-6">
              <h2 className="font-semibold text-3xl">
                Part 2: The Parametrized <u>backward process</u> with Neural Network
              </h2>
              <p>
                The authors in the papers propose to use a <strong>U-Net</strong> model for this process. I have used a
                very simple version of U-Net in my implementation with only 6 million parameters. It lacks many common
                improved such as BatchNormalization, GroupNormalization, Attention layer etc. I felt it was unnecessary
                for this demonstration so the model only use the main components of this architecture such as{" "}
                <i>Down</i> and <i>Up</i> sampling as well as some residual connections.
              </p>
              <h5 className="font-semibold">Key points:</h5>
              <ul className="list-disc list-inside">
                <li>The input of the mode is a noisy image, the output the noise present in the image</li>
                <li>
                  The Timestep is encoded by the transformer Sinusoidal Embedding in the form of positional embedding
                </li>
              </ul>
            </section>
            {/* Part Three */}
            <section id="partThree" className="space-y-4 mb-6">
              <h2 className="font-semibold text-3xl">Part 3: The loss</h2>
              <p>
                The last part is the loss function, diffusion models are optimized with the variational inference. To
                simple put we calculate the l1 or l2 distance of the predicted noise and the actual noise in the image.
              </p>
              <p>
                The following loss function takes model, image (<i>x_0</i>) and timestep (<i>t</i>) and returns the loss
                of the predicted noise and the sampled noise.
              </p>
              <div className="font-mono text-sm">
                <CodeBlock text={get_loss_py} language="python" showLineNumbers={true} theme={dracula} />
              </div>
            </section>
            {/* Sampling and Training */}
            <section id="samplingAndTraining" className="space-y-4 mb-6">
              <h2 className="font-semibold text-3xl">Sampling and Training</h2>
              <p>Finally we preform sampling before training.</p>
              <p>
                The normal timesteps T used in the papers is <strong>T=1000</strong>, however the larger the number the
                slower the sampling time. Due to hardware limitations and since this model is just to demonstrate the
                concept, I chose a smaller <strong>T=300</strong> and trained it for 500 epochs.
              </p>
              <div className="font-mono text-sm">
                <CodeBlock text={training_py} language="python" showLineNumbers={true} theme={dracula} />
              </div>
              <h5 className="font-semibold text-xl">The following are some of the final results:</h5>
              <Image src={result_1} alt="simulate_forward_diffusion_image" />
              <Image src={result_2} alt="simulate_forward_diffusion_image" />
              <Image src={result_3} alt="simulate_forward_diffusion_image" />
            </section>
            <section id="conclusion" className="space-y-4 mb-6">
              <h2 className="font-semibold text-3xl">Conclusion</h2>
              <p>
                The resolution of the generated images is very small however after 500 epochs they do start to appear as
                landscape. With longer training time and improved in the U-Net the results and me further improved.
              </p>
              <p>For the purpose of demonstrating a custom model, I feels the results are sufficient.</p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};
export default CustomModel;
