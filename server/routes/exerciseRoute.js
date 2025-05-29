import Router from 'express';
import { createExercise } from '../controllers/exercise.js';
import { getAllExercises } from '../controllers/exercise.js';
import { createWorkoutPlan } from '../controllers/exercise.js';
import { addExerciseToWorkoutPlan } from '../controllers/exercise.js';
import { getWorkoutPlanExercises } from '../controllers/exercise.js';



const ExerciseRoutes = Router();


ExerciseRoutes.post('/createExercise', createExercise);

ExerciseRoutes.get('/getAllExercises', getAllExercises);

ExerciseRoutes.post('/createWorkoutPlan', createWorkoutPlan);

ExerciseRoutes.post('/addExercisePlan', addExerciseToWorkoutPlan);

ExerciseRoutes.get('/getWorkoutPlanExercises/:workoutPlanId', getWorkoutPlanExercises);



export default ExerciseRoutes;

