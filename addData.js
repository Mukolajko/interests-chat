'use strict';

const async = require('async');
const MongoClient = require('mongodb').MongoClient;
let entityDbConnectionString = 'mongodb://localhost:27017/chat';
MongoClient.connect(entityDbConnectionString, {}, {}, function (err, db) {
    if (err) {console.log(err); process.exit();}

    let coll = db.collection('users');

    async.times(100, function(i, next){
        let objToSave = {
            _id: (i+1).toString(),
            name: "TestName" + i,
            phone: "TestPhone" + i,
            email: "TestEmail" + i
        };
        coll.save(objToSave, err => next());
    }, err => process.exit())
});