<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html ng-app="ArticleEdit">
  <head>
    <base href="<%=basePath%>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Nicholas学习笔记</title>
    <meta name="description" content="网络日记本">
    <meta name="keywords" content="angular，nodejs，javascript，HTML5，CSS3，前端开发，Java">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="http://nicholasway.cn/resources/imgs/favicon.ico">
    <link href="http://nicholasway.cn/resources/css/bootstrap.css" rel="stylesheet">
    <script src="http://nicholasway.cn/resources/js/jquery.min.js"></script>
    <script src="http://nicholasway.cn/resources/js/bootstrap.js"></script>
	<script src="http://nicholasway.cn/resources/js/angular.min.js"></script>
  </head>
  
  <body>
    <div class="container" style="margin-top: 100px" ng-controller="FormCtroller">
    	<div class="row">
    		 <div class="col-md-12">
    		 	<h2>发表新文章</h2>
    		 	<div>
    		 		<form class="form-horizontal" action="http://nicholasway.cn:3000/addBlogArticle" method="POST">
					  <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">文章标题</label>
					    <div class="col-sm-10">
					      <input type="text" name="title" class="form-control" id="title" placeholder="请输入文章标题">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="typeId" class="col-sm-2 control-label">文章类型</label>
					    <div class="col-sm-10">
					    	<select class="form-control" name="typeId" id="typeId" style="width: 150px;">
							  <option ng-repeat="type in types" value="{{type.id}}">{{type.type}}</option>
							</select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="inputPassword3" class="col-sm-2 control-label">文章内容</label>
					    <div class="col-sm-10">
					       <!-- 加载编辑器的容器 -->
						    <script id="container" name="content" type="text/plain">这里写你的初始化内容</script>
						    <!-- 配置文件 -->
						    <script type="text/javascript" src="resources/ueditor/ueditor.config.js"></script>
						    <!-- 编辑器源码文件 -->
						    <script type="text/javascript" src="resources/ueditor/ueditor.all.min.js"></script>
						    <script type="text/javascript" charset="utf-8" src="resources/ueditor/lang/zh-cn/zh-cn.js"></script>
						    <!-- 实例化编辑器 -->
						    <script type="text/javascript">
						        var ue = UE.getEditor('container');
						    </script>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="inputPassword3" class="col-sm-2 control-label"></label>
					    <div class="col-sm-10">
					  		<button type="submit" class="btn btn-primary ">发表</button>
				  		</div>
				  	  </div>
					</form>
    		 	</div>
    		 </div>
    	</div>
    </div>
  </body>
  <script type="text/javascript">
  	var ArticleEdit = angular.module("ArticleEdit",[]);
  	
  	function FormCtroller($scope,$http)
  	{
  		$http.get('http://nicholasway.cn:3000/queryBlogType').
		  success(function(data, status, headers, config) {
		    $scope.types = data;
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  	}
  
  
  </script>
</html>
