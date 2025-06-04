import { Router } from "express";
import { createProject } from "../controllers/project.js";
import { getProjectsbyUser } from "../controllers/project.js";


const ProjectRoutes = Router();

ProjectRoutes.post("/createProject", createProject);

ProjectRoutes.get("/getProjectsbyUser/:user_id", getProjectsbyUser);




export default ProjectRoutes;