import { Schema, model, models } from "mongoose";
import { TypeProject, TypeProjects } from "../types/types";

const projectsSchema = new Schema<TypeProjects>({
  userId: { type: Schema.Types.ObjectId, unique: true },
  projects: [
    {
      tool: String,
      model: String,
      images: [String],
      generationParameters: Schema.Types.Mixed,
    },
  ],
});

const Projects = models.Projects || model<TypeProjects>("Projects", projectsSchema);

export default Projects;
