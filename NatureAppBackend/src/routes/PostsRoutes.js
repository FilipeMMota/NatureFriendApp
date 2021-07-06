const express = require("express"); // Biblioteca para o desenvolvimento de APIs
const db = require("../ConnectionDb");
const requireAuth = require("../middleware/requireAuth"); // Middleware
const multer = require("multer"); // Usado para transferencia de ficheiros.
const fs = require("fs-extra"); // usado para trabalar com files
const path = require("path"); // usado para trabalhar com caminhos
const router = express.Router();

const PostImagesPath = path.join(__dirname, "../PostImages"); //Indicamos o path até à pasta onde ficam guardads as fotos

router.use(express.json());

const UploadPostImage = multer.diskStorage({
  // Aqui é onde é definido onde é que o ficheiro é guardado e com que nome vai ficar guardado
  destination(req, file, callback) {
    callback(null, "./src/PostImages");
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: UploadPostImage });

router.get("/userPosts", requireAuth, async (req, res) => {
  //Rota para a obtenção das publicações dos utilizadores
  try {
    const { user_id: id } = req.user;
    const query = `SELECT * FROM posts WHERE user_id = '${id}'`; // Obtenção das publicações de um certo id de um utilizador
    await db
      .query(query)
      .then((response) => {
        res.status(200).send(response.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(422).send("Algo correu mal");
      });
  } catch (err) {
    return console.log(err);
  }
});

router.get("/allPosts", requireAuth, async (req, res) => {
  //Rota para a obtenção de todas as publicações
  try {
    const query = `SELECT * FROM posts`; // Obtenção de todas as publicações feitas pelos utilizadores
    await db
      .query(query)
      .then((response) => {
        res.status(200).send(response.rows);
      })
      .catch((err) => {
        res.status(422).send("Algo correu mal");
      });
  } catch (err) {
    return console.log(err);
  }
});

router.post(
  "/posts",
  requireAuth,
  upload.single("PostPicture"), // Aqui indica o "id" da foto que nos queremos receber nesta função
  async (req, res) => {
    try {
      const { title, description, latitude, longitude } = req.body;
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
      await db
        .query(query)
        .then(() => {
          res.status(200).send({ message: "Post Created with sucess" });
        })
        .catch(() => {
          res.status(422).send("Algo correu mal"); // Caso algo no processo de criação de um usuário ou na criação do token correr mal é mandada uma mensagem de erro
        });
    } catch (err) {
      return console.log(err);
    }
  }
);

router.delete("/posts", requireAuth, async (req, res) => {
  //Rota para a remover uma publicação
  try {
    const { id } = req.body;

    const query = `SELECT post_img FROM posts WHERE post_id = ${id}`; // remoção de uma publicação de um utilizador
    await db
      .query(query)
      .then(async (response) => {
        let files = fs.readdirSync(PostImagesPath);
        if (files.includes(response.rows[0].post_img)) {
          fs.unlinkSync(
            path.join(__dirname, "../PostImages") +
              "\\" +
              response.rows[0].post_img
          );
        }

        const queryDelete = `DELETE FROM posts WHERE post_id = ${id}`; // remoção de uma publicação de um utilizador
        await db
          .query(queryDelete)
          .then(() => {
            res.status(200).send({ message: "Post Deleted" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        res.status(422).send("Algo correu mal");
      });
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
