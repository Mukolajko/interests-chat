'use strict';

const _ = require('underscore');
const util = require('util');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config.json');

class DbService  {
    constructor(options) {
        this.options = _.extend({
            mongoHost: 'localhost',
            mongoPort: 27017,
            mongoDB: config.dataStores.mongoDB || 'apimanager',
            username: config.dataStores.username || null,
            password: config.dataStores.password || null
        }, options);
    }

    connect () {
        return new Promise((resolve, reject) => {
            let entityDbConnectionString;

            if (this.options.username && this.options.password) {
                entityDbConnectionString = util.format('mongodb://%s:%s@%s:%d/%s', this.options.username, this.options.password, this.options.mongoHost, this.options.mongoPort, this.options.mongoDB);
            }
            else {
                entityDbConnectionString = util.format('mongodb://%s:%d/%s', this.options.mongoHost, this.options.mongoPort, this.options.mongoDB);
            }

            MongoClient.connect(entityDbConnectionString, {}, {}, function (err, db) {
                err ? reject(err) : resolve(db);
            });
        });
    }
}

module.exports = DbService;