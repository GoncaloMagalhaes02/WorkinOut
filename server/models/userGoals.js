import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";
import UserModel from "./user.js";
import GoalsModel from "./goals.js";

const UserGoalsModel = db.define('UserGoals', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    goalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GoalsModel,
            key: 'id'
        }
    },
}, {
    tableName: 'user_goals',
    timestamps: true, // Adiciona createdAt e updatedAt
});

// Definindo o relacionamento entre UserGoals e User
UserGoalsModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
});
// Definindo o relacionamento entre UserGoals e Goals
UserGoalsModel.belongsTo(GoalsModel, {
    foreignKey: 'goalId',
    as: 'goal'
});

export default UserGoalsModel;