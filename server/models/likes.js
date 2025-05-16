import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/db.js';
import UserModel from './user.js';
import PostsModel from './posts.js'; // Importa o modelo Posts

const LikesModel = db.define('Likes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    liked_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'likes',
    timestamps: true, // Adiciona createdAt e updatedAt
});

// Definindo o relacionamento entre Likes e User
LikesModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
});

// Definindo o relacionamento entre Likes e Posts
LikesModel.belongsTo(PostsModel, {
    foreignKey: 'post_id',
    as: 'post'
});

export default LikesModel;