/**
 * Created by user on 2015/4/20.
 */

var mysql  = require("mysql");

function querySql(callback,sql)
{
    var connection = mysql.createConnection({
       host : "127.0.0.1",
        user:"root",
        password:"root",
        database:"nicholas_bbs",
        port:"3306"
    });

    connection.query(sql, function (err,rows) {
        if(err)
        {
            console.info("err occur:" + err);
            return;
        }

        callback(rows);
    });

    connection.end(function () {
        console.info('database close');
    });
}

exports.accountQuery = function (callback) {
    querySql(callback,"select * from t_user");
};

exports.messageQuery = function (callback) {
  querySql(callback,"select * from t_message");
};