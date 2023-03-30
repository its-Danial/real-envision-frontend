import { Schema, model, models } from "mongoose";
import { TypeUsers } from "../types/users";

const usersSchema = new Schema<TypeUsers>({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  emailVerified: Boolean,
});

const Users = models.Users || model<TypeUsers>("Users", usersSchema);

export default Users;
