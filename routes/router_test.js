var express = require("express");

var router = express.Router();

router
    .get("/test", (req, res) => {
        res.render("index", {
            message: "Please enter a message",
            date: "Time will be show"
        });
    })
    .post("/test/a", (req, res) => {
        console.log(JSON.stringify(req.body.message));
        res.render("index", {
            message: req.body.message,
        });
    });

module.exports = router;
