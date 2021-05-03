const express = require('express');
const db = require("../ConnectionDb");

const router = express.Router();

router.get("/signup", async (req, res) => {
    //const {email, password} = req.body;
    const sql = "SELECT * FROM users"
    const doc = await db.query(sql);
    res.json(doc);
    
});

module.exports = router;