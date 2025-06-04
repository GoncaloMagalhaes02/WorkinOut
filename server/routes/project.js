import { Router } from "express";
import { createProject } from "../controllers/project.js";


const ProjectRoutes = Router();

ProjectRoutes.post("/createProject", createProject);


export default ProjectRoutes;