const express = require('express');
const {Client} = require('pg');
const authRoutes = require("./routes/AuthRoutes");
const app = express();
const port = 5000

app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(authRoutes);

const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "NatureFriend",
    password: "B26Tcv4f2",
    port: 5432,
});

db.connect(console.log("Connectado à base de dados"));

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

