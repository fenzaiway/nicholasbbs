/**
 * Created by user on 2015/4/21.
 */
var fs = require("fs");
var sys = require("util");

exports.util = function (fileName,key) {
  var configJson = {};

   try{
       var str = fs.readFileSync(fileName,"utf-8");
       configJson = JSON.parse(str);
   }catch (e)
   {
       sys.debug("JSON parse fails");
   }

    return configJson[key];
};