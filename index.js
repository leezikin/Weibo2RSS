var express = require('express');
var logger = require('./tools/logger');

logger.info(`🍻 Weibo2RSS start! Cheers!`);

var app = express();
app.get('/rss/:uid', require('./routes/get'));
app.listen(2333);