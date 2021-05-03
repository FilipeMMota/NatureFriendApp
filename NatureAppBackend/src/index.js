const express = require('express');
const authRoutes = require("./routes/AuthRoutes");
const app = express();
const port = 5000

app.use(express.json());
app.use(authRoutes);

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

