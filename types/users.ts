import { Types } from "mongoose";

export type TypeUser = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: null;
};
