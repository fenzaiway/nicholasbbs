/**
 * Created by way on 2015/5/16.
 */

var nicholasApp = angular.module("NicholasApp",['ui.router','ngLoadScript','Article.Service'])
    .filter("toHtml",["$sce", function ($sce) {
        //$sce Strict Contextual Escaping
        //自定义过滤器格式化html内容
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]);

/**获取文章标题列表*/
function ArticleListCtrl($scope,$http,ArticleService)
{
    /*$http.get(apiURL +'queryBlogList').
        success(function(data, status, headers, config) {
            $scope.titles = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });*/

    $scope.pageNow = 1;
    $scope.totalPage = 1;
    $scope.pageSize = 10;
    $scope.pages = [];
    $scope.endPage = 1;


    ArticleService.total().success(function (data) {
        $scope.total = data[0].total;
    });


    //加载
    $scope.load = function () {
        ArticleService.list($scope.pageNow,$scope.pageSize).success(function (data) {
            $scope.titles = data;
            //获取总页数
            $scope.totalPage = Math.ceil($scope.total / $scope.pageSize);
            $scope.endPage = $scope.totalPage;

            //生成数字链接
            if ($scope.pageNow > 1 && $scope.pageNow < $scope.totalPage) {
                $scope.pages = [
                        $scope.pageNow - 1,
                    $scope.pageNow,
                        $scope.pageNow + 1
                ];
            } else if ($scope.pageNow == 1 && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.pageNow,
                        $scope.pageNow + 1
                ];
            } else if ($scope.pageNow == $scope.totalPage && $scope.totalPage > 1) {
                $scope.pages = [
                        $scope.pageNow - 1,
                    $scope.pageNow
                ];
            }

        });
    };

    //下一页
    $scope.next = function () {
        if ($scope.pageNow < $scope.totalPage) {
            $scope.pageNow++;
            $scope.load();
        }
    };

    //上一页
    $scope.prev = function () {
        if ($scope.pageNow > 1) {
            $scope.pageNow--;
            $scope.load();
        }
    };

    //加载某一页
    $scope.loadPage = function (page) {
        $scope.pageNow = page;
        $scope.load();
    };
    $scope.loadPage(1);
}

/**获取文章详情*/
function ArticleDetailCtrl($scope, $urlRouter,$http,$location) {
    $http.get(apiURL+'getArticleById/' + $location.search()["id"]).
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

/**加载文章类型*/
function loadType($scope,$http)
{
    $http.get(apiURL+'queryBlogType').
        success(function(data, status, headers, config) {
            $scope.types = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
}

/**获取文章类型*/
function TypeListCtrl($scope,$http,$location)
{
    loadType($scope,$http);
}

/**文章类型表单*/
function TypeFormCtrl($scope,$http)
{
    $scope.postType = function postType() {
        $http.post(apiURL+"addBlogType",{"blogType":$scope.typename}).
            success(function(data, status, headers, config) {
                console.info(data);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
}


