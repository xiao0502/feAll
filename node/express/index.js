const express = require('express');
const app = express();
const homeRouter = require('./router/home')
const nunjucks = require('nunjucks');

// app.use(homeRouter)

// 应用级中间件

// // 匹配所有请求的中间件
// app.use(function (req, res, next) {
//     console.log(`All-Time: ${Date.now()}`);
//     next()
// })
// // 匹配/user请求的中间件
// app.use('/user', function (req, res, next) {
//     console.log(`User-Time: ${Date.now()}`);
//     next()
// }, function (req, res, next) {
//     console.log(`User2-Time: ${Date.now()}`);
//     next()
// })
//
// app.get('/user/18', function (req, res, next) {
//     res.send('user-18')
// })



// 路由级中间件

// home模块
app.use(homeRouter);



// 处理错误中间件

// app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//     next(err)
// });

app.use(function(req, res, next) {
    res.send('无此页面')
});


// 静态目录
app.use(express.static('assets'))

// 模板引擎

// app.set('views', './pages')
// app.set('view engine', 'jade')

// app.engine('html', ejs.__express);
// app.set('view engine', 'html');




nunjucks.configure('pages', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');



app.listen(8888, function () {
    console.log('server is running at 8888.');
})