const { response } = require('express');
const express = require('express'); // Biblioteca para o desenvolvimento de APIs
const db = require("../ConnectionDb");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/posts", requireAuth, async (req, res) => { //Rota para a obtenção dos useres
    try { 
        const query = `SELECT * FROM posts` // Crição de um novo User
        const result = await db.query(query);

        res.status(200).send(result.rows)

    }catch(err){
        return res.status(422).send("Algo correu mal"); // Caso algo no processo de criação de um usuário ou na criação do token correr mal é mandada uma mensagem de erro
    }
});

module.exports = router;