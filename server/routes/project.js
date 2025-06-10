import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectbyID,
  listProject,
} from "../controllers/project.js";
import { getProjectsbyUser } from "../controllers/project.js";
import { createProgressTrack } from "../controllers/project.js";
import upload from "../config/multer.js";
import { updateStatusProject } from "../controllers/project.js";
import { getProgressByProject } from "../controllers/project.js";

const ProjectRoutes = Router();

ProjectRoutes.get("/listProjects", listProject);

ProjectRoutes.post("/createProject", createProject);

ProjectRoutes.get("/getProjectsbyUser/:user_id", getProjectsbyUser);

ProjectRoutes.get("/getProjectsbyID/:id", getProjectbyID);

ProjectRoutes.delete("/deleteProject/:id", deleteProject);

ProjectRoutes.post("/createProgressTrack/:project_id", upload.single("photo"), createProgressTrack);

ProjectRoutes.put("/updateStatus/:projectId", updateStatusProject);

ProjectRoutes.get("/getProgressByProject/:projectId", getProgressByProject);

export default ProjectRoutes;
