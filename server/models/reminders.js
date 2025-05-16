import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";
import UserModel from "./user.js"; // Importa o modelo User

const RemindersModel = db.define('Reminders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reminder_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reminder_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    is_recurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'reminders',
    timestamps: true, // Adiciona createdAt e updatedAt
});


// Definindo o relacionamento entre Reminders e User
RemindersModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
});

export default RemindersModel;