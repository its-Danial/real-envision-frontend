import axios from "axios";
import { TextToImageGenerationParameters } from "../types/generationParameter";
import { FastAPIClient } from "./axiosClient";
import { TypeProject } from "../types/types";
import { Types } from "mongoose";

// FastAPI ML
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

// NextAPI
export const getUserProjects = async (userId: Types.ObjectId) => {
  const response = await axios.get(`/api/users/projects/${userId}`);
  return response;
};
export const getUserProject = async (userId: Types.ObjectId, projectId: Types.ObjectId) => {
  const response = await axios.get(`/api/users/projects/${userId}/${projectId}`);
  return response;
};
export const addUserProject = async (userId: Types.ObjectId, projectData: TypeProject) => {
  const response = await axios.put(`/api/users/projects/${userId}`, projectData);
  return response;
};

export const deleteUserProject = async (userId: Types.ObjectId, projectId: string) => {
  const response = await axios.delete(`/api/users/projects/${userId}/${projectId}`);
  return response;
};
