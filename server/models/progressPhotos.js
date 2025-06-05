import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";
import UserModel from "./user.js"; // Importa o modelo User
import ProjectModel from "./project.js";



const ProgressPhotosModel = db.define('ProgressPhotos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_taken: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'progress_photos',
    timestamps: true, // Adiciona createdAt e updatedAt
});

// Definindo o relacionamento entre ProgressPhotos e User
ProgressPhotosModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
});

// Definindo o relacionamento entre ProgressPhotos e Project
ProgressPhotosModel.belongsTo(ProjectModel, {
    foreignKey: 'project_id',
    as: 'project'
});


export default ProgressPhotosModel;