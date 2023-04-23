import {
  ImageInpaintingGenerationParameters,
  ImageToImageGenerationParameters,
  SuperResolutionGenerationParameters,
  TextToImageGenerationParameters,
} from "../types/generationParameter";

export const fastAPIbackendRoute = "http://127.0.0.1:8000";
export const nextAPIRoute = "http://localhost:3000";

export const generateRandomSeed = () => {
  return Math.floor(Math.random() * 10000);
};

export function convertImageToBase64(imgUrl: string) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx!.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
  };
  return (image.src = imgUrl);
}

export function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function dataURLtoFile(byteString: string, filename: string) {
  const dataUrl = `data:text/plain;base64,${byteString}`;

  let arr = dataUrl.split(","),
    // @ts-ignore
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function reshapeGenParams(
  params:
    | TextToImageGenerationParameters
    | ImageInpaintingGenerationParameters
    | ImageToImageGenerationParameters
    | SuperResolutionGenerationParameters,
  targetType: string
) {
  const baseParams = {
    prompt: params.prompt,
    num_inference_steps: params.num_inference_steps,
    guidance_scale: params.guidance_scale,
    negative_prompt: params.negative_prompt,
    num_images_per_prompt: params.num_images_per_prompt,
    seed: params.seed,
  };

  switch (targetType) {
    case "text-to-image":
      return { ...baseParams, height: 512, width: 512 };
    case "image-to-image":
      return {
        ...baseParams,
        strength: 0.8,
      };
    case "image-inpainting":
      return { ...baseParams, height: 512, width: 512 };
    case "super-resolution":
      return baseParams;
    default:
      break;
  }
}

export function instanceOfTextToImageGenParams(object: any): object is TextToImageGenerationParameters {
  return "height" in object && "width" in object;
}
export function instanceOfImageToImageGenParams(object: any): object is ImageToImageGenerationParameters {
  return "strength" in object && !("height" in object && "width" in object);
}

export function instanceOfImageInpaintingGenParams(object: any): object is ImageInpaintingGenerationParameters {
  return "height" in object && "width" in object;
}

export function instanceOfSuperResolutionGenParams(object: any): object is SuperResolutionGenerationParameters {
  return !("height" in object && "width" in object) || !("strength" in object);
}
