/**
 * Created by lenovo on 2017/10/28.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');

//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./router/dataExistList.router.js');


var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({'extended': true}));


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method === "OPTIONS") {
        res.send(200); //让options请求快速返回
    } else {
        next();
    }
});


app.use('/', api);

app.listen(8888, function () {
    console.log("Listening at 8888");
});
