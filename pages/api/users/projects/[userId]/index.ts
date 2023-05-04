import type { NextApiRequest, NextApiResponse } from "next";
import Projects from "../../../../../models/project";
import { TypeProjects } from "../../../../../types/types";
import connectMongoDB from "../../../../../utils/connectMongoDB";
import sharp from "sharp";

type Data = {
  success: boolean;
  data?: TypeProjects;
  message?: any;
};

/**
  Retrieves, updates or deletes a users projects from the database by its userId.
  @param {NextApiRequest} req - The request object containing the HTTP request.
  @param {NextApiResponse<Data>} res - The response object containing the HTTP response.
  @returns {Data} Returns an object indicating whether the operation was successful and the retrieved/updated/deleted user data, if any.
  */

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { userId },
    method,
  } = req;

  await connectMongoDB();

  switch (method) {
    case "GET" /* Get projects by userId */:
      try {
        const userProjects = await Projects.findOne<TypeProjects>({ userId: userId });

        if (!userProjects) {
          return res.status(400).json({ success: false, message: "No projects by that userId" });
        }

        const { projects } = userProjects;

        /*
         * get low resolution thumbnail of the first image
         * this is reduce data size over http request
         */
        for await (const project of projects) {
          const lowResThumbnailImageByte64String = await lowResImageForAllProjectsDisplay(project.images.at(0)!);

          project.images = [lowResThumbnailImageByte64String as string];
        }

        res.status(200).json({ success: true, data: userProjects });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case "PUT" /* Edit projects by userId */:
      try {
        const userProjects = await Projects.findOne({ userId: userId });

        if (!userProjects) {
          const userNewProjects = new Projects({ userId: userId, projects: [req.body] });

          const doc = await userNewProjects.save();
          if (!doc) {
            return res.status(400).json({ success: false, message: doc });
          }
          res.status(200).json({ success: true, data: doc });
        }

        userProjects.projects.push(req.body);

        const updatedDoc = await userProjects.save();

        res.status(200).json({ success: true, data: updatedDoc });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "unknown error" });
      break;
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
      responseLimit: "4mb",
    },
  },
};

// Helper function
export const lowResImageForAllProjectsDisplay = async (imageByte64String: string) => {
  const quality = 10;

  let imgBuffer = Buffer.from(imageByte64String, "base64");

  try {
    const bufferData = await sharp(imgBuffer).jpeg({ quality }).toBuffer();
    const lowResImageString = bufferData.toString("base64");
    return lowResImageString;
  } catch (err) {
    console.log(`lowRes issue ${err}`);
  }
};
