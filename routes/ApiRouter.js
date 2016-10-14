'use strict';

const express = require('express');
const router = express.Router();
const DbService = require('../services/DbService.js');
let dbInstance = null;
//connect ot DB using promise and set it in here to use in api routes
new DbService().connect()
    .then(db => {
        console.log("API router connected to DB");
        dbInstance = db;
    })
    .catch(error => console.log("Error in db connect. Error: " + error));

router.get('/users', function(req, res, next) {
    let collection = dbInstance.collection("users");
    collection.find({}).toArray((err, data) => {
        res.send({"error": err, "users": data});
    });
});

router.get('/user/:id', function(req, res, next) {
    let userId = req.params.id;
    if (!userId) {return res.send({"error": "Not valid route"});}

    let collection = dbInstance.collection("users");
    collection.findOne({_id: userId}, (err, user) => {
        res.json({error: err, user: user});
    });
});

module.exports = router;