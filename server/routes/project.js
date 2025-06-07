import { Router } from "express";
import { createProject } from "../controllers/project.js";
import { getProjectsbyUser } from "../controllers/project.js";
import { createProgressTrack } from "../controllers/project.js";
import upload from "../config/multer.js";


const ProjectRoutes = Router();

ProjectRoutes.post("/createProject", createProject);

ProjectRoutes.get("/getProjectsbyUser/:user_id", getProjectsbyUser);

ProjectRoutes.post("/createProgressTrack/:project_id", upload.single("photo"), createProgressTrack);


export default ProjectRoutes;