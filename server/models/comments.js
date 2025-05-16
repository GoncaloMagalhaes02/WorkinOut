import {Sequelize, DataTypes} from 'sequelize';
import db from '../config/db.js';
import UserModel from './user.js'; // Importa o modelo User
import PostsModel from './posts.js'; // Importa o modelo Posts

const CommentsModel = db.define('Comments', {
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
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date_commented: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'comments',
    timestamps: true, // Adiciona createdAt e updatedAt
});

// Definindo o relacionamento entre Comments e User
CommentsModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
});

// Definindo o relacionamento entre Comments e Posts
CommentsModel.belongsTo(PostsModel, {
    foreignKey: 'post_id',
    as: 'post'
});

export default CommentsModel;