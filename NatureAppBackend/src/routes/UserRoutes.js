const express = require("express"); // Biblioteca para o desenvolvimento de APIs
const db = require("../ConnectionDb");
const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const router = express.Router();
const UserImagesPath = path.join(__dirname, "../UserImages");

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
      let files = fs.readdirSync(UserImagesPath);
      if (files.includes(req.user.user_img)) {
        fs.unlinkSync(
          path.join(__dirname, "../UserImages") + "\\" + req.user.user_img
        );
      }

      const query = `UPDATE users SET user_img = '${req.file.filename}' WHERE user_id = ${req.user.user_id}`;
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
