var http = require("http");

http.createServer(function(req,res)
{
    res.writeHead({"content-type":"text/html"});
    res.end("<h4>Welcome to Nicholasway's BBS Home</h4>");
}).listen(80);
