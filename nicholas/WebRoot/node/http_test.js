/**
 * Created by user on 2015/4/24.
 */
var http = require("http");
var express = require('express');
var app = express();
var mysql = require("./mysql_1");

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    next();
});


/*http.createServer(function(req,res)
{
    //res.writeHeader(200,{"content-type":"text/plain"});
    //res.end("<h3>Hello World</h3>");
    mysql.accountQuery(function (rows) {
        //console.info(rows);
        res.writeHeader("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify(rows));//普通的json
    });


}).listen(8888);*/

app.get('/query', function(req, res) {
    mysql.accountQuery(function (rows) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify(rows));//普通的json
    });
});
//监听端口
app.listen(8888);