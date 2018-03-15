const express = require('express');
const router = express.Router();

const Tmp = require("../models/template.model").Template;

router.route('/')
    .get(function(req, res, next) {
        res.status(200).sendFile("../../public/index")
    })

module.exports = router;