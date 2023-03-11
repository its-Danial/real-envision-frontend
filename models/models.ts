export type TextToImageGenerationParameters = {
  prompt: string;
  height: number;
  width: number;
  num_inference_steps: number;
  guidance_scale: number;
  negative_prompt: string;
  num_images_per_prompt: number;
  seed: number;
};
export type ImageInpaintingGenerationParameters = {
  prompt: string;
  height: number;
  width: number;
  num_inference_steps: number;
  guidance_scale: number;
  negative_prompt: string;
  num_images_per_prompt: number;
  seed: number;
};

export type ImageToImageGenerationParameters = {
  prompt: string;
  strength: number;
  num_inference_steps: number;
  guidance_scale: number;
  negative_prompt: string;
  num_images_per_prompt: number;
  seed: number;
};
