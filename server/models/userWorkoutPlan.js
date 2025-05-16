import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/db.js';
import WorkoutPlanModel from './workoutPlan.js';
import ExerciseModel from './exercise.js';
import UserModel from './user.js';

const UserWorkoutPlanModel = db.define('UserWorkoutPlan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: WorkoutPlanModel,
            key: 'id'
        }
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'user_workout_plan_exercises',
    timestamps: true, // Adiciona createdAt e updatedAt
});

UserWorkoutPlanModel.belongsTo(WorkoutPlanModel, {
    foreignKey: 'plan_id',
    as: 'workoutPlan'
});


// Definindo o relacionamento entre UserWorkoutPlanExercises e User
UserWorkoutPlanModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    as: 'user'
});

export default UserWorkoutPlanModel;
