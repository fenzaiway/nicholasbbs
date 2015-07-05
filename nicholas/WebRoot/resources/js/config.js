/**
 * Created by way on 2015/7/5.
 */
//var host = "http://www.nicholasway.cn/";

var apiURL = "http://localhost:3000/";
(function(){
    var host = "http://localhost:63342/WebRoot/";
    //根据数组创建元素
    function createElement(arr,elem)
    {
        if("script" === elem)
        {
            arr.forEach(function(item){
                var script = document.createElement("script");
                script.src = item;
                //document.body.appendChild(script);
                document.getElementsByTagName('head')[0].appendChild(script);
            });
        }
        if("css" === elem)
        {
            arr.forEach(function(item){
                var link = document.createElement("link");
                link.href = item;
                link.rel = "stylesheet";
                //document.body.appendChild(link);
                document.getElementsByTagName('head')[0].appendChild(link);
            });
        }
    }

    //css
    var resourcesCSSPath = host+"resources/css/";
    var ni_bootstrap_css = resourcesCSSPath + "bootstrap.css";
    var ni_bootstrap_style = resourcesCSSPath + "style.css";
    var cssArray = [ni_bootstrap_css,ni_bootstrap_style];

    //js
    var resourcesJSPath = host+"resources/js/";
    var ni_angular_js = resourcesJSPath+"angular.min.js";
    var ni_angular_ui_js = resourcesJSPath+"angular-ui-router.min.js";
    var ni_bootstrap_js = resourcesJSPath+"bootstrap.js";
    var ni_loadScript_js = resourcesJSPath + "ngLoadScript.js";
    var ni_jquery_js = resourcesJSPath+"jquery.min.js";
    var ni_nicholas_js = resourcesJSPath+"NicholasApp.js";
    var jsArray = [ni_jquery_js,
                    ni_angular_js,
                    ni_angular_ui_js,
                    ni_bootstrap_js,
                    ni_loadScript_js,
                    ni_nicholas_js];

    //动态添加
    createElement(cssArray,"css");
    createElement(jsArray,"script");


})();

