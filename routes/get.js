var fetch = require('node-fetch');
var cheerio = require('cheerio');
var url = require('url');
var logger = require('../tools/logger');


module.exports = function (req, res) {
    res.header('Content-Type', 'application/xml; charset=utf-8');

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var query = url.parse(req.url,true).query;
    var debug = query.debug;

    var uid = req.params.uid;

    logger.info(`Weibo2RSS uid ${uid} form origin, IP: ${ip}`);

    fetch(`http://www.weiboread.com/user/${uid}`).then(
        response => response.text()
    ).then((data) => {
            var $ = cheerio.load(data, {
                decodeEntities: false
            });
            var wbs = [];
            var imgs;
            var items = $('.media.row.toutiao');
            var wb, item, titleEle,img;
            items.map(function (index, ele) {
                wb = {};
                item = $(this);
                titleEle = item.find('.media-body div p a:first-of-type');
                wb.title = titleEle.text().replace(/^\s+|\s+$/g, '');
                wb.title = wb.title.replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u0009|\u000a|\u000b|\u000c|\u000d|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f/g, '');
                wb.pubDate = item.find('.media-body div p:first-of-type').html();
                wb.link = item.find('.media-body div p a:first-of-type').attr('href');
                wb.imgs = [];
                imgs = item.find('.img-single');
                 imgs.map(function (index,ele) {
                     img = $(this);
                     img = img.attr('src');//获取图片
                     img = img.replace(/orj360/g,'large')
                     wb.imgs.push(img);
                     //logger.info(img);
                    // wb.img = img;
                 });
                wbs.push(wb);
            });
            var name = $('.username').text().slice(0,-3);

            var rss =
`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${name}的微博</title>
<link>http://weibo.com/${uid}/</link>
<description>${name}的照片RSS</description>
<language>zh-cn</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<ttl>300</ttl>`
            for (var i = 0; i < wbs.length; i++) {
                rss +=`
<item>
    <title><![CDATA[${wbs[i].title}]]></title>`

                for(var j = 0;j < wbs[i].imgs.length;j++){
                    rss +=`<img>${wbs[i].imgs[j]}</img>`
                }

                rss +=`<pubDate>${wbs[i].pubDate}</pubDate>
    <guid>${wbs[i].link}</guid>
</item>`
            }
            rss += `
</channel>
</rss>`
            res.send(rss);
        }
    ).catch(
        e => logger.error("Weibo2RSS Error: getting widget", e)
    );
};