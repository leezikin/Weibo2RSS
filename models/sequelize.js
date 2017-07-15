var Sequelize = require('sequelize');
var SQL_USER = require('../routes/config').SQL_USER;
var SQL_PASSWORD = require('../routes/config').SQL_PASSWORD;

exports.sequelize = function () {
	return new Sequelize('weibo', SQL_USER, SQL_PASSWORD, {'dialect': 'mysql',host: 'localhost', port:3306});
}
