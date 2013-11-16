var http = require('http');
var url = require('url');
var sd = require('./library.js').sd;
var handler = require('./handler'); 
var routes = handler.routes;
var data = handler.data;

var no_method = function(req,res){
	res.writeHead(404, {"Content-Type": "text/html"});
	var msg = "The available functionalities are<br/> 1. Add <br/> 2. List <br/> 3. Search";
	res.write(msg);
	res.end();
};
var ConnectionListener = function (req,res){
	var requrl = url.parse(req.url,true);
	data.rn = requrl.query.roll;
	data.name = requrl.query.name;
	data.percentage = requrl.query.per;
	var method = requrl.pathname;
	var main_route = routes[method] || no_method;
	main_route(req,res);
};
var server = http.createServer(ConnectionListener);
server.listen(8088);
console.log('server is listening at port 8088');