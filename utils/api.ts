import { ImageToImageGenerationParameters } from "./../models/models";
import axiosClient from "./axiosClient";

export const generateTextToImage = async (parameters: ImageToImageGenerationParameters) => {
  const response = await axiosClient.post(`/text-to-image`, parameters);
  return response;
};
