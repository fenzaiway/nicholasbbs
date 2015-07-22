/**
 * Created by way on 2015/7/20.
 */
/** 分页组件 */
var apiURL = "http://www.nicholasway.cn:3000/";
angular.module("Article.Service",[])
    .factory("ArticleService",["$http", function ($http) {
        return {
            total : function () {
                //总页数
                return $http.get(apiURL +"total");
            },
            list : function (pageNow, pageSize) {
                return $http.get(apiURL +"list?pageNow=" + pageNow + "&pageSize="+pageSize);
            }
        }
}]);