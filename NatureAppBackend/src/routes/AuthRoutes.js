const express = require('express'); // Biblioteca para o desenvolvimento de APIs
const db = require("../ConnectionDb");
const jwt = require("jsonwebtoken"); // Biblioteca de um token de segurança
const bcrypt = require("bcrypt"); // Biblioteca de hashing da password
require("dotenv").config(); // Biblioteca para esconder informações importantes no código

const router = express.Router();

router.get("/signup", async (req, res) => { //Rota para a obtenção dos useres
    const query = "SELECT * FROM users"
    const result = await db.query(query);
    res.json(result);
});

router.post("/signup", (req, res, next) => { // Rota para a criação de um user
    const {email, username, password} = req.body; // Desestruturação das variáveis que se encontram no corpo do request
    const getCurrentDate = () => { // Obtenção da data a que este request foi executado
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return date + '-' + month + '-' + year;
    };
    
    bcrypt.hash(password, 10, async function(err, hash) { // função de hashing da password
        if(err){ // Verificação de algum erro neste processo
            return next(err);
        }

        try { 
            const query = `INSERT INTO users (user_email, user_name, user_password, date) VALUES ('${email}', '${username}', '${hash}', '${getCurrentDate()}')` // Crição de um novo User
            await db.query(query); 

            const token = jwt.sign({ email, username }, process.env.jwt_key); // Criação de um token que tem associado o emaill e o username introduzidos
            res.send({token}); //envio do token para uso posterior nos requests
        }catch(err){
            return res.status(422).send("Username ou email já existente"); // Caso algo no processo de criação de um usuário ou na criação do token correr mal é mandada uma mensagem de erro
        }
    });

});

module.exports = router;