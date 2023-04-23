import type { NextApiRequest, NextApiResponse } from "next";
import { TypeProjects } from "../../../../../types/types";
import connectMongoDB from "../../../../../utils/connectMongoDB";
import Projects from "../../../../../models/project";

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
        const userProjects = await Projects.findOne({ userId: userId });

        if (!userProjects) {
          return res.status(400).json({ success: false, message: "No projects by that userId" });
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
      sizeLimit: "20mb",
      responseLimit: "20mb",
    },
  },
};
