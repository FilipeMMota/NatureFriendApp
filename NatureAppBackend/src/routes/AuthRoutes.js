const express = require('express');

const router = express.Router();

router.post("/teste", (req, res) => {
    console.log(req.body);
    res.send("bom dia");
});

module.exports = router;