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

    if (!name || !description) {
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





