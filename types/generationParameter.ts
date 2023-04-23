type BaseGenerationParameters = {
  prompt: string;
  num_inference_steps: number;
  guidance_scale: number;
  negative_prompt: string;
  num_images_per_prompt: number;
  seed: number;
};

export type TextToImageGenerationParameters = BaseGenerationParameters & {
  height: number;
  width: number;
};

export type ImageToImageGenerationParameters = BaseGenerationParameters & {
  strength: number;
};
export type ImageInpaintingGenerationParameters = TextToImageGenerationParameters;

export type SuperResolutionGenerationParameters = BaseGenerationParameters;
