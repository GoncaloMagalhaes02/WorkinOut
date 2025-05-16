import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/db.js';
import WorkoutPlanModel from './workoutPlan.js';

const WorkoutPlanExercisesModel = db.define('WorkoutPlanExercises', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    workoutPlanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: WorkoutPlanModel,
            key: 'id'
        }
    },
    exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'workout_plan_exercises',
    timestamps: true, // Adiciona createdAt e updatedAt
});

// Definindo o relacionamento entre WorkoutPlanExercises e WorkoutPlan

WorkoutPlanExercisesModel.belongsTo(WorkoutPlanModel, {
    foreignKey: 'workoutPlanId',
    as: 'workoutPlan'
});

export default WorkoutPlanExercisesModel;