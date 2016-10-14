'use strict';

const express = require('express');
const router = express.Router();

router.use('/', function(req, res, next) {
    res.render("index", {name: "TestName"});
    next();
});

module.exports = router;