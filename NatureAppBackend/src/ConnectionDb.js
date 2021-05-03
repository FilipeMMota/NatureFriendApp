const {Client} = require('pg');

const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "NatureFriend",
    password: "B26Tcv4f2",
    port: 5432,
});

db.connect(console.log("Connectado à base de dados"));

module.exports = db;