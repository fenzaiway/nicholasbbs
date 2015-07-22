<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="common.jsp" %>
<%
	request.setAttribute("id", request.getParameter("id"));
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
    <link rel="shortcut icon" href="${basePath }resources/imgs/favicon.ico">
    <link href="${basePath }resources/css/bootstrap.css" rel="stylesheet">
    <script src="${basePath }resources/js/jquery.min.js"></script>
    <script src="${basePath }resources/js/bootstrap.js"></script>
	<script src="${basePath }resources/js/angular.min.js"></script>
  </head>
  
  <body>
    <div class="container" style="margin-top: 100px" ng-controller="FormCtroller">
    	<div class="row">
    		 <div class="col-md-12">
    		 	<h2>更新文章</h2>
    		 	<div>
    		 		<form class="form-horizontal" action="${apiUrl }updateBlogArticle" method="POST">
					  <div class="form-group">
					    <label for="title" class="col-sm-2 control-label">文章标题</label>
					    <div class="col-sm-10">
					      <input type="text" name="title" ng-model="article.t_title" class="form-control" id="title" placeholder="请输入文章标题">
					      <input type="hidden" name="id" ng-model="article.t_id" class="form-control" id="id" />
					    </div>
					  </div>
					  <div class="form-group" style="display:none;"> 
					    <label for="id" class="col-sm-2 control-label">id</label>
					    <div class="col-sm-10">
					      <input type="text" name="articleId" ng-model="article.t_id" class="form-control" id="articleId" placeholder='id'/>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="typeId" class="col-sm-2 control-label">文章类型</label>
					    <div class="col-sm-10">
					    	<select class="form-control" name="typeId" id="typeId" style="width: 150px;">
							  <option ng-repeat="type in types" id='typeId_{{type.id}}' value="{{type.id}}" >{{type.type}}</option>
							</select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="inputPassword3" class="col-sm-2 control-label">文章内容</label>
					    <div class="col-sm-10">
					       <!-- 加载编辑器的容器 -->
						    <script id="container" name="content" type="text/plain"></script>
						    <!-- 配置文件 -->
						    <script type="text/javascript" src="${basePath }resources/ueditor/ueditor.config.js"></script>
						    <!-- 编辑器源码文件 -->
						    <script type="text/javascript" src="${basePath }resources/ueditor/ueditor.all.min.js"></script>
						    <script type="text/javascript" charset="utf-8" src="${basePath }resources/ueditor/lang/zh-cn/zh-cn.js"></script>
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
  		$http.get('${apiUrl }queryBlogType').
			  success(function(data, status, headers, config) {
			    $scope.types = data;
			  }).
			  error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
  		$http.get('${apiUrl }getArticleById/${id}').
	        success(function(data, status, headers, config) {
	            $scope.article = data[0];
	            ue.addListener( 'ready', function( editor ) {
	      			ue.setContent($scope.article.t_content);
	      		});
	            document.getElementById("typeId_" + $scope.article.t_type_id).setAttribute("selected", "selected");
	        }).
	        error(function(data, status, headers, config) {
	            // called asynchronously if an error occurs
	            // or server returns response with an error status.
	        });
  	}

  
  </script>
</html>
