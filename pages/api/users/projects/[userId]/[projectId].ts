import type { NextApiRequest, NextApiResponse } from "next";
import Projects from "../../../../../models/project";
import { TypeProject, TypeProjects } from "../../../../../types/types";
import connectMongoDB from "../../../../../utils/connectMongoDB";

type Data = {
  success: boolean;
  data?: TypeProject;
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
    query: { userId, projectId },
    method,
  } = req;

  await connectMongoDB();

  switch (method) {
    case "GET" /* Get projects by userId */:
      try {
        const userProjects: TypeProjects | null = await Projects.findOne({ userId: userId });

        if (!userProjects) {
          return res.status(400).json({ success: false, message: "No projects by that userId" });
        }

        const searchedProject = userProjects.projects.find((project) => project._id == projectId);

        res.status(200).json({ success: true, data: searchedProject });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case "DELETE" /* Delete a project by its ID and userId */:
      try {
        const userProjects = await Projects.findOneAndUpdate(
          {
            userId: userId,
          },
          {
            $pull: {
              projects: {
                _id: projectId,
              },
            },
          },
          { new: true }
        );

        if (!userProjects) {
          return res.status(400).json({ success: false, message: "No projects by that userId" });
        }

        res.status(200).json({ success: true, data: userProjects });
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
      sizeLimit: "8mb",
      responseLimit: "8mb",
    },
  },
};
