import ProjectModel from "../models/project.js";



export const createProject = async (req, res) => {
    try {
        const { name, description, data_inicio, data_fim, status, user_id, peso_inicial, peso_final } = req.body;

        const newProject = await ProjectModel.create({
            name,
            description,
            data_inicio,
            data_fim,
            status,
            user_id,
            peso_inicial,
            peso_final
        });

        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProjectsbyUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const projects = await ProjectModel.findAll({
            where: { user_id },
        });

        if (projects.length === 0) {
            return res.status(404).json({ message: "User não tem nenhum projeto" });
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}