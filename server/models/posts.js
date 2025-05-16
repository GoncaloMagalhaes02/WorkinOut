import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";
import UserModel from "./user.js"; // Importa o modelo User
import ProgressPhotosModel from "./progressPhotos.js";

const PostsModel = db.define('Posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_posted: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    is_private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'posts',
    timestamps: true, // Adiciona createdAt e updatedAt
});

// Definindo o relacionamento entre Posts e User
PostsModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
});

export default PostsModel;