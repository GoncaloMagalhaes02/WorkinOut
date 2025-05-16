import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js'; // Importa a instância do Sequelize
import UserModel from './models/user.js'; // Importa o modelo User
import GoalsModel from './models/goals.js'; // Importa o modelo Goals
import UserGoalsModel from './models/userGoals.js';
import WorkoutPlanModel from './models/workoutPlan.js'; // Importa o modelo WorkoutPlan
import ExerciseModel from './models/exercise.js';
import WorkoutPlanExercisesModel from './models/workoutPlanExercises.js';
import UserWorkoutPlanModel from './models/userWorkoutPlan.js';
import ProgressPhotosModel from './models/progressPhotos.js';
import PostsModel from './models/posts.js';
import LikesModel from './models/likes.js';
import CommentsModel from './models/comments.js';
import RemindersModel from './models/reminders.js';

dotenv.config(); // Carrega variáveis do .env

const app = express();
const PORT = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await db.authenticate();
    await db.sync({alter: true}); // Sincroniza o modelo com a base de dados
    console.log('✅ Ligação à base de dados bem-sucedida!');
  } catch (error) {
    console.error('❌ Erro ao ligar à base de dados:', error);
  }
});


