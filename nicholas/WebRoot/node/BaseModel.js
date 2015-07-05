/**
 * Created by user on 2015/4/21.
 */
var configUtil = require("./util");
var mysql = require("mysql");
var dbClient;

module.exports = function () {

    __constructor();

    /**数据查询接口*/
    this.findOneById = function (tableName, idJson, callback) {
        __constructor();
        dbClient.query("select * from " + tableName + " where ?",
        idJson, function (err,results) {
                if(err)
                {
                    console.log("GetData Error :" + err.message);
                    dbClient.end();
                    callback(false);
                }else
                {
                    if(results)
                    {
                        //返回一条数据
                        callback(results.pop());
                    }else
                    {
                        callback(results);
                    }
                }
            });
    };

    /**数据插入接口*/
    this.insert = function (tableName, rowInfo, callback) {
        __constructor();
        dbClient.query("insert into " + tableName + " set ? ",
        rowInfo, function (err,result) {
                if(err)
                {
                    throw err;
                }
                callback(result.insertId);
            });
    };

    /**数据修改接口*/
    this.modify = function (tableName, idJson, rowInfo, callback) {
        __constructor();
        dbClient.query("update " + tableName + " set ? where ? ",
        [rowInfo,idJson], function (err,result) {
                if(err)
                {
                    console.info("ClientReady Error:" + err.message);
                    callback(false);
                }else
                {
                    callback(result);
                }
            });
    };

    /**数据删除接口*/
    this.remove = function (tableName, idJson, callback) {
        __constructor();
        dbClient.query("delete from " + tableName + " where ?",
        idJson, function (err,results) {
                if(err)
                {
                    console.info("ClientReady delete Error:" + err.message);
                    dbClient.end();
                    callback(false);
                }else
                {
                    callback(true);
                }
            });
    };

    /**数据条件查询接口*/
    this.find = function (tableName, whereJson, orderByJson, limitAttr, fieldAttr, callback) {
        __constructor();
        var andWhere = whereJson["and"];
        var orWhere = whereJson["or"];
        var andArr = [];
        var orArr = [];

        //将数组转换为where and 条件array
        for(var i = 0; i<andWhere.length; i++)
        {
            andArr.push(andWhere[i]["key"] +
            andWhere[i]["opts"] +
            andWhere[i]["value"]);
        }

        //将数组转换为where or 条件array
        for(var i=0; i<orWhere.length; i++)
        {
            orArr.push(orWhere[i]["key"] +
            orWhere[i]["opts"] +
            orWhere[i]["value"]);
        }

        var filedsStr = fieldAttr.length > 0 ? fieldAttr.join(",") : "*";
        var andStr = andArr.length > 0 ? andArr.join(" and ") : "";
        var orStr = orArr.length > 0 ? " or " + orArr.join("or") : "";
        var limitStr = limitAttr.length > 0 ? " limit " + limitAttr.join(",") : "";
        var orderStr = orderByJson ? " order by " + orderByJson["key"] + " " + orderByJson["type"] : "";

        var sql = "select " + filedsStr + " from " + tableName
        + " where " + andStr + orStr + orderStr + limitStr;
        console.info("sql=\n" + sql);
        dbClient.query(sql, function (err,results) {
            if(err)
            {
                console.log("GetData Error:" + err.message);
                dbClient.end();
                callback(false);
            }else
            {
                callback(results);
            }
        });
    };

    this.findBySql = function (sql,callback) {
        __constructor();
        dbClient.query(sql, function (err,results) {
            if(err)
            {
                console.log("GetData Error:" + err.message);
                dbClient.end();
                callback(false);
            }else
            {
                callback(results);
            }
        });
        dbClient.end();
    };

    function __constructor() {
        var dbConfig = configUtil.util("config.json","db");

        var client = {};

        client.host = dbConfig["host"];
        client.port = dbConfig["port"];
        client.user = dbConfig["user"];
        client.password = dbConfig["password"];
        //根据配置文件创建数据库链接
        dbClient = mysql.createConnection(client);
        dbClient.connect();

        dbClient.query("USE " + dbConfig["dbName"], function (error,result) {
           if(error)
           {
               console.log("ClientConnectionReady Error : " + error.message());
               dbClient.end();
           }

            console.info("connection local mysql success");
        });
    }

};


