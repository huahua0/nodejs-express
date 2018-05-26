var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //cookie转换
var logger = require('morgan');  //日志输出

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('.html', ejs.__express);
// app.engine('.html', require('ejs').__express);
app.engine('.html', require('ejs').__express); //ejs能够识别后缀为’.html’的文件
app.set('view engine', 'html'); //调用render函数时能自动为我们加上’.html’ 后缀
// app.set('view engine', 'jade'); //使用jade模板

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//应用插件

app.use(express.static(path.join(__dirname, 'public')));//输出静态文件

// 路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 设置本地全局信息，渲染本地页面
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
