# Weibo2RSS

> 使用RSS订阅喜欢的微博博主，更新微博邮件提醒，并使用咕咕机打印。

## Install

软件环境：Nodejs，MySQL

请在 `routes/config.js` 下填写您的数据库配置与邮箱配置。

## 介绍

RSS 格式输出一个微博博主最新的 15 条微博，可以使用 RSS 阅读器来获取及时推送，配合 [IFTTT](https://ifttt.com/) 还可以实现更多好玩的功能。


## 使用

使用 RSS 阅读器订阅：https://api.prprpr.me/weibo/rss/{微博博主的uid}

获取uid：进入博主的微博主页，控制台执行
```js
/uid=(\d+)/. exec(document.querySelector('.opt_box .btn_bed').getAttribute('action-data'))[1]
```

## 搭建

需要环境：Node.js

## LICENSE

MIT © [DIYgod](http://github.com/DIYgod)

MIT © [Airing](http://github.com/airingursb)