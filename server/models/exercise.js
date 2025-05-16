import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/db.js';
import WorkoutPlanModel from './workoutPlan.js';

const ExerciseModel = db.define('Exercise', {
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
    photo_exercise: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'exercises',
    timestamps: true, // Adiciona createdAt e updatedAt
});

// Definindo o relacionamento entre Exercise e WorkoutPlan
ExerciseModel.belongsTo(WorkoutPlanModel, {
    foreignKey: 'workoutPlanId',
    as: 'workoutPlan'
});

export default ExerciseModel;