const { response } = require("express");
const express = require("express"); // Biblioteca para o desenvolvimento de APIs
const db = require("../ConnectionDb");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/posts", requireAuth, async (req, res) => {
  //Rota para a obtenção dos useres
  try {
    const { user_id: id } = req.user;
    const query = `SELECT * FROM posts WHERE user_id = ${id}`; // Crição de um novo User
    const result = await db.query(query);

    res.status(200).send(result.rows);
  } catch (err) {
    return res.status(422).send("Algo correu mal"); // Caso algo no processo de criação de um usuário ou na criação do token correr mal é mandada uma mensagem de erro
  }
});

router.post("/posts", requireAuth, async (req, res) => {
  try {
    const { image, title, description, latitude, longitude } = req.body;

    const { user_id: id } = req.user;

    const getCurrentDate = () => {
      // Obtenção da data a que este request foi executado
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      return date + "-" + month + "-" + year;
    };

    const query = `INSERT INTO posts (user_id, post_img, post_title, post_description, post_lat ,post_lon, post_date) VALUES (${id}, '${image}', '${title}', '${description}', '${latitude}', '${longitude}', '${getCurrentDate()}')`;
    await db.query(query);
  } catch (err) {
    return console.log(err); //res.status(422).send("Algo correu mal"); // Caso algo no processo de criação de um usuário ou na criação do token correr mal é mandada uma mensagem de erro
  }
});

module.exports = router;
