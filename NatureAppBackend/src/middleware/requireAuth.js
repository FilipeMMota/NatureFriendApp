const jwt = require("jsonwebtoken"); // Biblioteca de um token de segurança
const db = require("../ConnectionDb");
require("dotenv").config(); // Biblioteca para esconder informações importantes no código

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // Recolha do token através dos headers do request
  const token = authorization.split("$")[1]; // Concatenação da String para obter apenas o token

  if (!token) {
    // Se não existir um token quer dizer que esse usuário não existe ou não tem a sessão iniciada portanta damos uma mensage de erro
    return res.status(401).send({ error: "Precisa de ter a sessão iniciada." });
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    // verificação da existência do token
    if (err) {
      return res
        .status(401)
        .send({ error: "Precisa de ter a sessão iniciada." });
    }

    const { email } = payload; // Recolha do email a que o token se refere
    const query = `SELECT user_id, user_name, user_email, date FROM users WHERE user_email = '${email}'`; // Recolha dos dados do utilizador através do email
    const result = await db.query(query);

    const resultToString = JSON.stringify(result.rows[0]); // Preparação dos dados para poderem ser lidos
    const jsonObject = JSON.parse(resultToString);

    req.user = jsonObject; // Adicionar os dados recolhidos do query no header para uso posterior
    next();
  });
};
