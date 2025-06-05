import ProjectModel from "../models/project.js";

export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      data_inicio,
      data_fim,
      user_id,
      peso_inicial,
      peso_final,
    } = req.body;

    // Validate dates
    if (new Date(data_inicio) < new Date().setHours(0, 0, 0, 0)) {
      return res
        .status(400)
        .json({ message: "Data de início não pode ser anterior à data atual" });
    }
    // Validate required fields
    if (
      !name ||
      !description ||
      !data_inicio ||
      !data_fim ||
      !user_id ||
      peso_inicial === undefined ||
      peso_final === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    //a data nao pode ser inferior a data atual
    if (new Date(data_inicio) >= new Date()) {
      return res
        .status(400)
        .json({ message: "Data de início não pode ser anterior à data atual" });
    }

    const newProject = await ProjectModel.create({
      name,
      description,
      data_inicio,
      data_fim,
      user_id,
      peso_inicial,
      peso_final,
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
};

export const getProjectbyID = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ProjectModel.findAll({
      where: { id },
    });

    if (project.length === 0) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "ID do Plano de Treino inválido" });
  }

  try {
    // Apagar o projeto diretamente
    const deletedProject = await ProjectModel.destroy({
      where: { id },
    });

    if (deletedProject) {
      res.status(200).json({ message: "Projeto eliminado com sucesso" });
    } else {
      res.status(404).json({ message: "Projeto não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao apagar o projeto:", error);
    res.status(500).json({ message: "Erro interno ao apagar o projeto" });
  }
};

export const listProject = async (req, res) => {
  try {
    const projects = await ProjectModel.findAll();
    res.json(projects);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
