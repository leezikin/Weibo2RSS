var Sequelize = require('sequelize');
var sequelize = require('./sequelize').sequelize();
var Weibo = sequelize.import('./weibo');

sequelize.sync();

exports.Weibo = Weibo;
