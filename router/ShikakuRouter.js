const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const size = req.query.size || 5;
    res.render("index", { size });
});

module.exports = router;
