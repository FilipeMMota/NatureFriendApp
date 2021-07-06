const express = require("express"); // Biblioteca para o desenvolvimento de APIs
const db = require("../ConnectionDb");
const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");
const fs = require("fs-extra"); // usado para trabalar com files
const path = require("path"); // usado para trabalhar com caminhos
const router = express.Router();
const UserImagesPath = path.join(__dirname, "../UserImages"); //Indicamos o path até à pasta onde ficam guardads as fotos

router.use(express.json());

const UploadProfileImage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./src/UserImages");
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: UploadProfileImage,
});

router.post(
  "/profile",
  requireAuth,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      // Aqui nos primeiro fazemos o delete da foto que estava anteriormente para poupar recursos ao programa
      let files = fs.readdirSync(UserImagesPath);
      if (files.includes(req.user.user_img)) {
        fs.unlinkSync(
          path.join(__dirname, "../UserImages") + "\\" + req.user.user_img
        );
      }

      const query = `UPDATE users SET user_img = '${req.file.filename}' WHERE user_id = ${req.user.user_id}`; // Atualizamos na base de dados a foto que foi adicionada
      await db.query(query);

      res.status(200).json({
        message: "success!",
      });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
