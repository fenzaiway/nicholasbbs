/**
 * Created by user on 2015/4/24.
 */
var express = require("express");
var io = require("socket.io");
var BaseModel = require("./BaseModel");
var mysql = require("./mysql_1");
var bodyParser = require('body-parser');
var baseModel = new BaseModel();
var rowInfo = {};

var app = new express();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    next();
});
app.set('trust proxy', 'loopback, 112.74.88.185');
app.get('/query', function(req, res) {
    mysql.accountQuery(function (rows) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify(rows));//普通的json
    });
});

app.get("/queryMsg", function (req, res) {
    mysql.messageQuery(function (rows) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify(rows));//普通的json
    });
});

/*获取文章类型*/
app.get("/queryBlogType", function (req, res) {
    var sql = "select * from t_blog_type where 1=1";
    baseModel.findBySql(sql,function (rows) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify(rows));//普通的json
    });
});
/*根据ID获取文章详细*/
app.get("/getArticleById/:id", function (req, res) {
    var sql = "select * from t_blog_article where t_id=" + req.params.id;
    baseModel.findBySql(sql,function (rows) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify(rows));//普通的json
    });
});

app.get("/queryBlogList", function (req, res) {
    var sql = "select bt.type,ba.t_id,ba.t_title,ba.t_time from t_blog_type as bt, t_blog_article as ba where ba.t_type_id=bt.id order by ba.t_id desc";
    baseModel.findBySql(sql,function (rows) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify(rows));//普通的json
    });
});


app.post("/addBlogType", function (req, res) {
    var rowInfo = {};
    rowInfo.type = req.body.blogType;
    baseModel.insert("t_blog_type",rowInfo, function () {
        //res.header("Content-Type", "text/plain");
        //res.end("添加成功");
        rowInfo.code = "0";
        rowInfo.msg = "添加成功";
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify());//普通的json
    });
});

app.post("/addBlogArticle", function (req, res) {
    var rowInfo = {};
    rowInfo.t_title = req.body.title;
    rowInfo.t_content = req.body.content;
    rowInfo.t_type_id = req.body.typeId;
    baseModel.insert("t_blog_article",rowInfo, function () {
        res.header("Content-Type", "text/plain");
        res.end("添加成功");
    });
});



var server = app.listen(3000);

var socketServer = io.listen(server);

socketServer.on("connection", function (client) {
    socketServer.emit("server msg","欢迎登录");

    client.on('join', function(msg){
            client.nickname = msg;
            socketServer.sockets.emit('announcement', '系统提示：'+ msg + ' 加入了聊天室!');
    });

    //监听客户端发来的消息
    client.on("client message", function (msg) {

       rowInfo.t_nickname = client.nickname;
        rowInfo.t_message = msg;
        baseModel.insert("t_message",rowInfo, function (ret) {

        });

        //给客户端回写消息
        client.broadcast.emit("rewrite",client.nickname + ":" + msg);
    });

    client.on('disconnect', function(){
        if(client.nickname){
            client.broadcast.emit('client message','系统:' + client.nickname + '离开聊天室!');
        }
    })
});








