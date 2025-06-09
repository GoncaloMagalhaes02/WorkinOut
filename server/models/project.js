import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";
import UserModel from "./user.js"; // Importa o modelo User



const ProjectModel = db.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Sem estado', 'Concluído', 'Cancelado', 'Em andamento'),
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    peso_inicial: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    peso_final: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

}, {
    tableName: 'projects',
    timestamps: true, // Adiciona createdAt e updatedAt
});

ProjectModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
});




export default ProjectModel;