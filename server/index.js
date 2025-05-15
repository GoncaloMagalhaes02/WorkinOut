import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js'; // Importa a instância do Sequelize

dotenv.config(); // Carrega variáveis do .env

const app = express();
const PORT = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log('✅ Ligação à base de dados bem-sucedida!');
  } catch (error) {
    console.error('❌ Erro ao ligar à base de dados:', error);
  }
});


