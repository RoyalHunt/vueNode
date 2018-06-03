'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {};

config.port = parseInt(process.env.PORT, 10) || 8080;
config.mongoDBUrl = 'mongodb://mongodb:27017/clientsList';

exports.default = config;