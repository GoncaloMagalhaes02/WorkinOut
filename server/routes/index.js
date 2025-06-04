import express from 'express';
import UserRoutes from './userRoutes.js';
import ExerciseRoutes from './exerciseRoute.js';
import ProjectRoutes from './project.js';



const router = express.Router();

router.use('/users', UserRoutes);

router.use('/exercises', ExerciseRoutes);

router.use('/projects', ProjectRoutes);



export default router;
