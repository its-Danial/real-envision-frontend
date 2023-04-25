import { Schema, model, models } from "mongoose";
import { TypeUser } from "../types/types";

const usersSchema = new Schema<TypeUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  emailVerified: Boolean,
  profileDescription: {
    type: String,
    default: "Fellow AI Enthusiast",
    required: true,
  },
  imageDownloadFormat: {
    type: String,
    default: "JPEG",
    required: true,
  },
});

const Users = models.Users || model<TypeUser>("Users", usersSchema);

export default Users;
