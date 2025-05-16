import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";


const GoalsModel = db.define('Goals', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'goals',
    timestamps: true, // Adiciona createdAt e updatedAt
}
);


export default GoalsModel;


