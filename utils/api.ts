import { TextToImageGenerationParameters, ImageToImageGenerationParameters } from "./../models/models";
import axiosClient from "./axiosClient";

export const generateTextToImage = async (parameters: TextToImageGenerationParameters) => {
  const response = await axiosClient.post(`/text-to-image`, parameters);
  return response;
};

export const generateImageToImage = async (parameters: ImageToImageGenerationParameters) => {
  const response = await axiosClient.post(`/image-to-image`, parameters);
  return response;
};
