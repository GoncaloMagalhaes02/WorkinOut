import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";

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
        allowNull: true,
    },
}, {
    tableName: 'workout_plans',
    timestamps: true, // Adiciona createdAt e updatedAt
});



export default WorkoutPlanModel;