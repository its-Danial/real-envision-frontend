import { Types } from "mongoose";
import {
  ImageInpaintingGenerationParameters,
  ImageToImageGenerationParameters,
  SuperResolutionGenerationParameters,
  TextToImageGenerationParameters,
} from "./generationParameter";

export type TypeUser = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: null;
  profileDescription: string;
  imageDownloadFormat: string;
};

export type TypeProject = {
  _id?: Types.ObjectId;
  tool: string;
  model: string;
  images: string[];
  generationParameters:
    | TextToImageGenerationParameters
    | ImageInpaintingGenerationParameters
    | ImageToImageGenerationParameters
    | SuperResolutionGenerationParameters;
  timeStamp: Date;
};

export type TypeProjects = {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  projects: TypeProject[];
};
