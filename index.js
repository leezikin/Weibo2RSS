var express = require('express');
var logger = require('./tools/logger');

logger.info(`Weibo2RSS start`);

var app = express();
app.get('/photo/:uid', require('./routes/get'));
app.listen(8080);