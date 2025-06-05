import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectbyID,
  listProject,
} from "../controllers/project.js";
import { getProjectsbyUser } from "../controllers/project.js";

const ProjectRoutes = Router();

ProjectRoutes.get("/listProjects", listProject);

ProjectRoutes.post("/createProject", createProject);

ProjectRoutes.get("/getProjectsbyUser/:user_id", getProjectsbyUser);

ProjectRoutes.get("/getProjectsbyID/:id", getProjectbyID);

ProjectRoutes.delete("/deleteProject/:id", deleteProject);

export default ProjectRoutes;
