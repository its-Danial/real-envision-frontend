import { TextToImageGenerationParameters } from "./../models/models";
import axiosClient from "./axiosClient";

export const generateTextToImage = async (parameters: TextToImageGenerationParameters) => {
  const response = await axiosClient.post(`/text-to-image`, parameters);
  return response;
};

export const generateImageToImage = async (formData: FormData) => {
  const response = await axiosClient.post(`/image-to-image`, formData);
  return response;
};

export const createImageMask = async (formData: FormData) => {
  const response = await axiosClient.post("/create-image-mask", formData);
  return response;
};
