import ProjectModel from "../models/project.js";



export const createProject = async (req, res) => {
    try {
        const { name, description, data_inicio, data_fim, status, user_id, workoutPlan_id, peso_inicial, peso_final } = req.body;

        const newProject = await ProjectModel.create({
            name,
            description,
            data_inicio,
            data_fim,
            status,
            user_id,
            workoutPlan_id,
            peso_inicial,
            peso_final
        });

        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
