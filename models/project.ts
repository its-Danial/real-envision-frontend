import { Schema, model, models } from "mongoose";
import { TypeProjects } from "../types/types";

const projectsSchema = new Schema<TypeProjects>({
  userId: { type: Schema.Types.ObjectId, unique: true },
  projects: [
    {
      tool: String,
      model: String,
      images: [String],
      generationParameters: Schema.Types.Mixed,
      timeStamp: Date,
    },
  ],
});

const Projects = models.Projects || model<TypeProjects>("Projects", projectsSchema);

export default Projects;
