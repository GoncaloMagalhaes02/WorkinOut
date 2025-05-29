import express from 'express';
import UserRoutes from './userRoutes.js';
import ExerciseRoutes from './exerciseRoute.js';



const router = express.Router();

router.use('/users', UserRoutes);

router.use('/exercises', ExerciseRoutes);



export default router;
