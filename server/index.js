import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js"; // Importa a instância do Sequelize
import UserModel from "./models/user.js"; // Importa o modelo User
import WorkoutPlanModel from "./models/workoutPlan.js"; // Importa o modelo WorkoutPlan
import ExerciseModel from "./models/exercise.js";
import WorkoutPlanExercisesModel from "./models/workoutPlanExercises.js";
import ProgressPhotosModel from "./models/progressPhotos.js";
import PostsModel from "./models/posts.js";
import LikesModel from "./models/likes.js";
import CommentsModel from "./models/comments.js";
import RemindersModel from "./models/reminders.js";
import ProjectsModel from "./models/project.js"; // Importa o modelo Project
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config(); // Carrega variáveis do .env

const app = express();
const PORT = process.env.SERVER_PORT;

const clientURL = "*";

const corsOptions = {
  origin: clientURL,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware para exibir logs das solicitações
app.use(morgan("combined"));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuração do diretório de uploads
app.use("/uploads", express.static(join(__dirname, "./uploads")));

app.use(router);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await db.authenticate();
    await db.sync({ alter: true }); // Sincroniza o modelo com a base de dados
    console.log("✅ Ligação à base de dados bem-sucedida!");
  } catch (error) {
    console.error("❌ Erro ao ligar à base de dados:", error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Erro interno no servidor" });
});
