import { Schema, model, models } from "mongoose";
import { TypeUser } from "../types/users";

const usersSchema = new Schema<TypeUser>({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  emailVerified: Boolean,
  imageDownloadFormat: {
    type: String,
    default: "PNG",
    required: true,
  },
});

const Users = models.Users || model<TypeUser>("Users", usersSchema);

export default Users;
