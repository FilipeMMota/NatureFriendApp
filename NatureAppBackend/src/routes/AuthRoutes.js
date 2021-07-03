const express = require("express"); // Biblioteca para o desenvolvimento de APIs
const db = require("../ConnectionDb");
const jwt = require("jsonwebtoken"); // Biblioteca de um token de segurança
const bcrypt = require("bcrypt"); // Biblioteca de hashing da password
const requireAuth = require("../middleware/requireAuth");
require("dotenv").config(); // Biblioteca para esconder informações importantes no código

const router = express.Router();

router.get("/user", requireAuth, (req, res) => {
  //Rota para a obtenção dos useres
  const username = req.user.user_name;
  const date = req.user.date;
  const image = req.user.user_img;
  res.status(200).send({ username, date, image });
});

router.post("/signup", (req, res, next) => {
  // Rota para a criação de um user
  const { email, username, password } = req.body; // Desestruturação das variáveis que se encontram no corpo do request

  const getCurrentDate = () => {
    // Obtenção da data a que este request foi executado
    var date = new Date().getDate() + 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return date + "-" + month + "-" + year;
  };

  bcrypt.hash(password, 10, async function (err, hash) {
    // função de hashing da password
    if (err) {
      // Verificação de algum erro neste processo
      return next(err);
    }

    try {
      const query = `INSERT INTO users (user_email, user_name, user_password, date) VALUES ('${email}', '${username}', '${hash}', '${getCurrentDate()}')`; // Crição de um novo User
      await db.query(query);

      const token = jwt.sign({ email, username }, process.env.JWT_KEY); // Criação de um token que tem associado o emaill e o username introduzidos
      res.status(200).send({ token }); //envio do token para uso posterior nos requests
    } catch (err) {
      return res.status(422).send("Username ou email já existente"); // Caso algo no processo de criação de um usuário ou na criação do token correr mal é mandada uma mensagem de erro
    }
  });
});

const comparePassword = function (candidatePassword, userPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, userPassword, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = `SELECT user_name, user_email, user_password FROM users WHERE user_email = '${email}'`; // Verifica se existe um user com este email e se existir retirra o resto dos dados
    const result = await db.query(query);

    const resultToString = JSON.stringify(result.rows[0]); // Preparação dos dados para poderem ser lidos
    const {
      user_name,
      user_email,
      user_password: userPassword,
    } = JSON.parse(resultToString);

    await comparePassword(password, userPassword); // Verificação da password

    const token = jwt.sign(
      { email: user_email, username: user_name },
      process.env.JWT_KEY
    ); // Criação de um token que tem associado o emaill e o username introduzidos
    res.send({ token }); //envio do token para uso posterior nos requests
  } catch (err) {
    return res
      .status(422)
      .send({ error: "O email ou a password estão errados." }); // caso algo corra mal
  }
});

module.exports = router;
