const express = require("express"); // Biblioteca de um token de segurança
const authRoutes = require("./routes/AuthRoutes");
const requireAuth = require("./middleware/requireAuth");
const postsRoutes = require("./routes/PostsRoutes");
const userRoutes = require("./routes/UserRoutes");
const UserImages = require("path").join(__dirname, "/UserImages");
const PostImages = require("path").join(__dirname, "/PostImages");

const app = express();
const port = 5000; // Porta onde o servidor está a correr

app.use(express.json());
app.use(express.static(UserImages));
app.use(express.static(PostImages));
app.use(authRoutes);
app.use(postsRoutes);
app.use(userRoutes);

app.get("/", requireAuth, (req, res) => {
  // Rota default
  res.send(
    `Your email is ${req.user.user_email} your username is ${req.user.user_name}, and your account was created on ${req.user.date}`
  );
});

app.listen(port, () => {
  // Iniciação do nó
  console.log(`App running on port ${port}.`);
});
