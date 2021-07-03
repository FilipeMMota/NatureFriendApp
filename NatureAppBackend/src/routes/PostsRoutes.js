const express = require("express"); // Biblioteca para o desenvolvimento de APIs
const db = require("../ConnectionDb");
const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");
const router = express.Router();

router.use(express.json());

const UploadPostImage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./src/PostImages");
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: UploadPostImage });

router.get("/posts", requireAuth, async (req, res) => {
  //Rota para a obtenção dos users
  try {
    const { user_id: id } = req.user;
    const query = `SELECT * FROM posts WHERE user_id = ${id}`; // Crição de um novo User
    const result = await db.query(query);

    res.status(200).send(result.rows);
  } catch (err) {
    return res.status(422).send("Algo correu mal"); // Caso algo no processo de criação de um usuário ou na criação do token correr mal é mandada uma mensagem de erro
  }
});

router.post(
  "/posts",
  requireAuth,
  upload.single("PostPicture"),
  async (req, res) => {
    try {
      const { title, description, latitude, longitude } = req.body;
      console.log("file", req.file);
      console.log("body", req.body);
      console.log("title: ", title);
      const { user_id: id } = req.user;

      const getCurrentDate = () => {
        // Obtenção da data a que este request foi executado
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return date + "-" + month + "-" + year;
      };

      const query = `INSERT INTO posts (user_id, post_img, post_title, post_description, post_lat , post_lng, post_date) VALUES (${id}, '${
        req.file.filename
      }', '${title}', '${description}', '${latitude}', '${longitude}', '${getCurrentDate()}')`;
      await db.query(query);

      return res.status(200).send({ message: "Post Created with sucess" });
    } catch (err) {
      return console.log(err); //res.status(422).send("Algo correu mal"); // Caso algo no processo de criação de um usuário ou na criação do token correr mal é mandada uma mensagem de erro
    }
  }
);

module.exports = router;
