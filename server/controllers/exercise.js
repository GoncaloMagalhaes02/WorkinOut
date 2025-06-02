import ExerciseModel from "../models/exercise.js";
import WorkoutPlanModel from "../models/workoutPlan.js";
import WorkoutPlanExercisesModel from "../models/workoutPlanExercises.js";


export const createExercise = async (req, res) => {
    const { name, description, photo_exercise} = req.body;
   

    if (!name || !description) {
        return res.status(400).json({ message: "Precisa de preencher todos os campos" });
    }

    try {
        const newExercise = await ExerciseModel.create({
            name,
            description,
            photo_exercise: req.file ? `/uploads/${req.file.filename}` : "/uploads/defaultexercise.png",
        });

        res.status(201).json(newExercise);
    } catch (error) {
        console.error("Error creating exercise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllExercises = async (req, res) => {
    try {
        const exercises = await ExerciseModel.findAll();
        res.status(200).json(exercises);
    } catch (error) {
        console.error("Error fetching exercises:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createWorkoutPlan = async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Precisa de preencher todos os campos" });
    }

    try {
        const newWorkoutPlan = await WorkoutPlanModel.create({
            name,
            description,
        });

        res.status(201).json(newWorkoutPlan);
    } catch (error) {
        console.error("Error creating workout plan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addExerciseToWorkoutPlan = async (req, res) => {
    const { workoutPlanId, exerciseId } = req.body;

    if (!workoutPlanId || !exerciseId) {
        return res.status(400).json({ message: "Precisa de preencher todos os campos" });
    }

    try {
        const newWorkoutPlanExercise = await WorkoutPlanExercisesModel.create({
            workoutPlanId,
            exerciseId,
        });

        res.status(201).json(newWorkoutPlanExercise);
    } catch (error) {
        console.error("Error adding exercise to workout plan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getWorkoutPlanExercises = async (req, res) => {
    const { workoutPlanId } = req.params;

    //verifica se o workoutPlanId existe
    if (!workoutPlanId || isNaN(workoutPlanId)) {
        return res.status(400).json({ message: "ID do Plano de Treino inválido" });
    }
    


    if (!workoutPlanId) {
        return res.status(400).json({ message: "Plano de Treino não existe" });
    }

    try {
        const workoutPlanExercises = await WorkoutPlanExercisesModel.findAll({
            where: { workoutPlanId },
            include: [
                {
                    model: ExerciseModel,
                    as: 'exercise',
                },
                {
                    model: WorkoutPlanModel,
                    as: 'workoutPlan',
                    attributes: ['id', 'name'], 
                }
            ],
        });

        res.status(200).json(workoutPlanExercises);
    } catch (error) {
        console.error("Error fetching workout plan exercises:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllWorkoutPlans = async (req, res) => {
    try {
        const workoutPlans = await WorkoutPlanModel.findAll();
        res.status(200).json(workoutPlans);
    } catch (error) {
        console.error("Error fetching workout plans:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteWorkoutPlan = async (req, res) => {
  const { workoutPlanId } = req.params;

  if (!workoutPlanId || isNaN(workoutPlanId)) {
    return res.status(400).json({ message: "ID do Plano de Treino inválido" });
  }

  try {
    // Apagar primeiro as associações com os exercícios
    await WorkoutPlanExercisesModel.destroy({
      where: { workoutPlanId }
    });

    // Agora apagar o plano de treino
    const deletedWorkoutPlan = await WorkoutPlanModel.destroy({
      where: { id: workoutPlanId },
    });

    if (deletedWorkoutPlan) {
      res.status(200).json({ message: "Plano de Treino eliminado com sucesso" });
    } else {
      res.status(404).json({ message: "Plano de Treino não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao apagar plano de treino:", error);
    res.status(500).json({ message: "Erro interno ao apagar plano de treino" });
  }
}

export const deleteExercise = async (req, res) => {
    const { exerciseId } = req.params;

    if (!exerciseId || isNaN(exerciseId)) {
        return res.status(400).json({ message: "ID do Exercício inválido" });
    }

    try {
        const deletedExercise = await ExerciseModel.destroy({
            where: { id: exerciseId },
        });

        if (deletedExercise) {
            res.status(200).json({ message: "Exercício eliminado com sucesso" });
        } else {
            res.status(404).json({ message: "Exercício não encontrado" });
        }
    } catch (error) {
        console.error("Error deleting exercise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteWorkoutPlanExercise = async (req, res) => {
  const { workoutPlanId, exerciseId } = req.params;

  if (!workoutPlanId || !exerciseId || isNaN(workoutPlanId) || isNaN(exerciseId)) {
    return res.status(400).json({ message: "IDs inválidos" });
  }

  try {
    const deleted = await WorkoutPlanExercisesModel.destroy({
      where: {
        workoutPlanId,
        exerciseId
      }
    });

    if (deleted) {
      res.status(200).json({ message: "Exercício removido do plano com sucesso" });
    } else {
      res.status(404).json({ message: "Associação não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao remover exercício do plano:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};




