import type { NextApiRequest, NextApiResponse } from "next";
import Users from "../../../../models/users";
import { TypeUser } from "../../../../types/users";
import connectMongoDB from "../../../../utils/connectMongoDB";

type Data = {
  success: boolean;
  data?: TypeUser;
};

/**
Retrieves, updates or deletes a user from the database by its email.
@param {NextApiRequest} req - The request object containing the HTTP request.
@param {NextApiResponse<Data>} res - The response object containing the HTTP response.
@returns {Data} Returns an object indicating whether the operation was successful and the retrieved/updated/deleted user data, if any.
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { email },
    method,
  } = req;

  await connectMongoDB();

  switch (method) {
    case "GET" /* Get a user by its email */:
      try {
        const user = await Users.findOne({ email: email });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a user by its email */:
      try {
        const user = await Users.findOneAndUpdate({ email: email }, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a user by its email */:
      try {
        const deletedUser = await Users.findOneAndDelete({ email: email });
        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
