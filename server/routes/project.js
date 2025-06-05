import { Router } from "express";
import { createProject, getProjectbyID } from "../controllers/project.js";
import { getProjectsbyUser } from "../controllers/project.js";

const ProjectRoutes = Router();

ProjectRoutes.post("/createProject", createProject);

ProjectRoutes.get("/getProjectsbyUser/:user_id", getProjectsbyUser);

ProjectRoutes.get("/getProjectsbyID/:id", getProjectbyID);

export default ProjectRoutes;
