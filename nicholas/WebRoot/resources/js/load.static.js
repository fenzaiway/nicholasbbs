/**
 * Created by way on 2015/5/16.
 * 加载静态资源
 */
    var staticArr = [];
    staticArr.push('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
    staticArr.push('<title>Nicholas学习笔记</title>');
    staticArr.push('<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">');
    staticArr.push('<meta name="baidu-site-verification" content="SgwCDj7N3e" />');
    staticArr.push('<meta name="description" content="网络日记本">');
    staticArr.push('<meta name="keywords" content="angular，nodejs，javascript，HTML5，CSS3，前端开发，Java">');
    staticArr.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    staticArr.push('<link rel="shortcut icon" href="../resources/imgs/favicon.ico">');
    staticArr.push('<link href="../resources/css/bootstrap.css" rel="stylesheet">');
    staticArr.push('<link href="../resources/css/style.css" rel="stylesheet">');

    var headerHTML = "";
    staticArr.forEach(function (str) {
        headerHTML += str;
    });

    var oHead = document.getElementsByTagName('head')[0];
    oHead.innerHTML = headerHTML;

