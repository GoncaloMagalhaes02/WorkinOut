import ProjectModel from "../models/project.js";
import ProgressPhotosModel from "../models/progressPhotos.js";



export const createProject = async (req, res) => {
    try {
        const { name, description, data_inicio, data_fim, user_id, peso_inicial, peso_final } = req.body;

        // Validate dates 
        if (new Date(data_inicio) >= new Date(data_fim)) {
            return res.status(400).json({ message: "Data de início deve ser anterior à data de fim" });
        }
        // Validate required fields
        if (!name || !description || !data_inicio || !data_fim || !user_id || peso_inicial === undefined || peso_final === undefined) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        //a data nao pode ser inferior a data atual
        if (new Date(data_inicio) < new Date()) {
            return res.status(400).json({ message: "Data de início não pode ser anterior à data atual" });
        }


        const newProject = await ProjectModel.create({
            name,
            description,
            data_inicio,
            data_fim,
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

export const createProgressTrack = async (req, res) => {
    try {
        const { user_id, data_taken, semanaAtual, pesoAtual } = req.body;
        const { project_id } = req.params;
        const file = req.file; // Vem do multer

        // Validar campos obrigatórios
        if (!user_id || !project_id || !file || semanaAtual === undefined || pesoAtual === undefined) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        // Data (pode vir do body ou ser a atual)
        const finalDate = data_taken ? new Date(data_taken) : new Date();

        // Validar data
        if (finalDate > new Date()) {
            return res.status(400).json({ message: "A data da foto não pode ser no futuro" });
        }

        // Verificar se o projeto existe
        const project = await ProjectModel.findByPk(project_id);
        if (!project) {
            return res.status(404).json({ message: "Projeto não encontrado" });
        }

        // Caminho relativo da imagem salva
        const photoPath = `/uploads/${file.filename}`;

        // Criar novo registo
        const newPhoto = await ProgressPhotosModel.create({
            user_id,
            project_id,
            photo: photoPath,
            data_taken: finalDate,
            semanaAtual,
            pesoAtual
        });

        res.status(201).json(newPhoto);
    } catch (error) {
        console.error("Error creating progress photo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
