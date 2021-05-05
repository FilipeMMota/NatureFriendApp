const {Client} = require('pg'); // importação da biblioteca do postgreSQL

const db = new Client({ // onde é colocado todos os dados necessários para a conexão à base de dados
    user: "postgres",
    host: "localhost",
    database: "NatureFriend",
    password: "B26Tcv4f2",
    port: 5432,
});

db.connect(console.log("Connectado à base de dados")); // Coneção à base de dados

module.exports = db; // Exportação da conexão à base de dados para fazer querys