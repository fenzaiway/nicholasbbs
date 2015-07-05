/**
 * Created by user on 2015/4/20.
 */

var mysql  = require("mysql");

function querySql(callback,sql)
{
    var connection = mysql.createConnection({
       host : "58.53.199.76",
        user:"root",
        password:"lutong2014ABC",
        database:"nicholas_bbs",
        port:"9005"
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