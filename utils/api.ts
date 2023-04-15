import { TextToImageGenerationParameters } from "../types/generationParameter";
import { FastAPIClient } from "./axiosClient";

export const generateTextToImage = async (parameters: TextToImageGenerationParameters) => {
  const response = await FastAPIClient.post(`/text-to-image`, parameters);
  return response;
};

export const generateImageToImage = async (formData: FormData) => {
  const response = await FastAPIClient.post(`/image-to-image`, formData);
  return response;
};

export const createImageMask = async (formData: FormData) => {
  const response = await FastAPIClient.post("/create-image-mask", formData);
  return response;
};

export const generateImageInpainting = async (formData: FormData) => {
  const response = await FastAPIClient.post("/image-inpainting", formData);
  return response;
};

export const generateSuperResolution = async (formData: FormData) => {
  const response = await FastAPIClient.post(`/super-resolution`, formData);
  return response;
};
