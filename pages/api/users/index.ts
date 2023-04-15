import type { NextApiRequest, NextApiResponse } from "next";
import Users from "../../../models/users";
import { TypeUser } from "../../../types/types";
import connectMongoDB from "../../../utils/connectMongoDB";

type Data = {
  success: boolean;
  data?: TypeUser[];
};

/**
Retrieves all users from the database.
@param {NextApiRequest} req - The request object containing the HTTP request.
@param {NextApiResponse<Data>} res - The response object containing the HTTP response.
@returns {Data} Returns an object indicating whether the operation was successful and the retrieved user data, if any.
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;

  await connectMongoDB();

  switch (method) {
    case "GET":
      try {
        // Retrieve all users from the database.
        const users = await Users.find<TypeUser>({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        // Return an error response if there was an issue retrieving the users.
        res.status(400).json({ success: false });
      }
      break;
    default:
      // Return an error response if the request method is not supported.
      res.status(400).json({ success: false });
      break;
  }
}
