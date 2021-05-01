const express = require('express')
const {Client} = require('pg')
const app = express()
const port = 3000

app.use(express.json())

const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "NatureFriend",
    password: "B26Tcv4f2",
    port: 5432,
});

db.connect(console.log("Connectado à base de dados"));

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

