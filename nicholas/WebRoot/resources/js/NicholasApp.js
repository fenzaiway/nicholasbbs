/**
 * Created by way on 2015/5/16.
 */

var nicholasApp = angular.module("NicholasApp",['ui.router','ngLoadScript'])
    .filter("toHtml",["$sce", function ($sce) {
        //$sce Strict Contextual Escaping
        //自定义过滤器格式化html内容
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]);

/**获取文章标题列表*/
function ArticleListCtrl($scope,$http)
{
    $http.get('http://nicholasway.cn:3000/queryBlogList').
        success(function(data, status, headers, config) {
            $scope.titles = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
}

/**获取文章详情*/
function ArticleDetailCtrl($scope, $urlRouter,$http,$location) {
    $http.get('http://nicholasway.cn:3000/getArticleById/' + $location.search()["id"]).
        success(function(data, status, headers, config) {
            $scope.article = data[0];
            //设置标题.t_title
            document.title = document.title + "-" + data[0].t_title;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
}

