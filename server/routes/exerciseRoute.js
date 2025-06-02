import Router from 'express';
import { createExercise } from '../controllers/exercise.js';
import { getAllExercises } from '../controllers/exercise.js';
import { createWorkoutPlan } from '../controllers/exercise.js';
import { addExerciseToWorkoutPlan } from '../controllers/exercise.js';
import { getWorkoutPlanExercises } from '../controllers/exercise.js';
import { getAllWorkoutPlans } from '../controllers/exercise.js';
import { deleteExercise } from '../controllers/exercise.js';
import { deleteWorkoutPlan } from '../controllers/exercise.js';
import { deleteWorkoutPlanExercise } from '../controllers/exercise.js';



const ExerciseRoutes = Router();


ExerciseRoutes.post('/createExercise', createExercise);

ExerciseRoutes.get('/getAllExercises', getAllExercises);

ExerciseRoutes.post('/createWorkoutPlan', createWorkoutPlan);

ExerciseRoutes.post('/addExercisePlan', addExerciseToWorkoutPlan);

ExerciseRoutes.get('/getWorkoutPlanExercises/:workoutPlanId', getWorkoutPlanExercises);

ExerciseRoutes.get('/getAllWorkoutPlans', getAllWorkoutPlans);

ExerciseRoutes.delete('/deleteExercise/:exerciseId', deleteExercise);

ExerciseRoutes.delete('/deleteWorkoutPlan/:workoutPlanId', deleteWorkoutPlan);

ExerciseRoutes.delete('/deleteWorkoutPlanExercise/:workoutPlanId/:exerciseId', deleteWorkoutPlanExercise);





export default ExerciseRoutes;

