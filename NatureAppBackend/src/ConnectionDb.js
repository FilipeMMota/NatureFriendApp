const { Client } = require("pg"); // importação da biblioteca do postgreSQL
require("dotenv").config(); // Biblioteca para esconder informações importantes no código

const db = new Client({
  // onde é colocado todos os dados necessários para a conexão à base de dados
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect(console.log("Connectado à base de dados")); // Coneção à base de dados

module.exports = db; // Exportação da conexão à base de dados para fazer querys
