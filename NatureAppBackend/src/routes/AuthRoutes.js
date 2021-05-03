const express = require('express');
const db = require("../ConnectionDb");

const router = express.Router();

router.get("/signup", async (req, res) => { //get useres
    const query = "SELECT * FROM users"
    const result = await db.query(query);
    res.json(result);
    
});

router.post("/signup", async (req, res) => { // create a user
    const {email, password} = req.body;
    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return date + '-' + month + '-' + year;
    };
    try {
        const query = `INSERT INTO users (user_email, user_name, user_password, date) VALUES ('${email}', 'TheGbossTV', '${password}', '${getCurrentDate()}')`
        const result = await db.query(query);
        res.send("User Created");
    }catch(err){
        return res.status(422).send("Email ou username já existente");
    }
});

module.exports = router;