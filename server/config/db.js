import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config(); // Carrega variáveis do .env

const db = new Sequelize('workinoutdb', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Desativa logs do Sequelize
});


export default db;