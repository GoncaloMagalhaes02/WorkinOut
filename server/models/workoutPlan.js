import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";
import GoalsModel from "./goals.js";

const WorkoutPlanModel = db.define('WorkoutPlan', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'workout_plans',
    timestamps: true, // Adiciona createdAt e updatedAt
});

// Definindo o relacionamento entre WorkoutPlan e Goals
WorkoutPlanModel.belongsTo(GoalsModel, {
    foreignKey: 'goalId',
    as: 'goal'
});

export default WorkoutPlanModel;