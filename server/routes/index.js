import express from 'express';
import UserRoutes from './userRoutes.js';
import ExerciseRoutes from './exerciseRoute.js';
import ProjectRoutes from './project.js';
import CommentsRoutes from './commentsRoute.js';




const router = express.Router();

router.use('/users', UserRoutes);

router.use('/exercises', ExerciseRoutes);

router.use('/projects', ProjectRoutes);

router.use('/comments', CommentsRoutes);



export default router;
