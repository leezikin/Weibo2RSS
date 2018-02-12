var express = require('express');
var logger = require('./tools/logger');

logger.info(`Weibo2RSS start`);

var app = express();
app.get('/',(req,res)=>{
   res.sendfile(__dirname + '/views/index.html');
});
app.get('/rss2yinxiang/:uid', require('./routes/rss2yinxiang'));
app.get('/rss2onedrive/:uid', require('./routes/rss2onedrive'));
app.get('*',(req, res)=>{
    res.sendfile(__dirname + '/views/404.html');
});
app.listen(8080);