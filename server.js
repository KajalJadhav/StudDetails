var http = require('http');
var url = require('url');
var fs = require('fs');
var homeTemplate = fs.readFileSync('./template','utf-8');
var message_page = fs.readFileSync('./public/html/message.html','utf-8');
var sd = require('./library.js').sd;
var handler = require('./handler'); 
var static_route = require('./staticData').static_handler;
var routes = handler.routes;
var data = handler.data;

var no_method = function(req,res){
	var msg = "<h3>The available functionalities are<br/> 1. Add <br/> 2. List <br/> 3. Search </h3>";
	message_page = message_page.replace(/{home}/,homeTemplate);
	message_page = message_page.replace(/{message}/,msg);
	res.writeHead(404, {"Content-Type": "text/html"});
	res.write(message_page);
	res.end();
};
var ConnectionListener = function (req,res){
	var requrl = url.parse(req.url,true);
	var method = requrl.pathname;
	console.log(method,(static_route[req.method] && static_route[req.method](req,res)));
	if(routes[req.method+method])
		main_route = routes[req.method+method];
	else if(static_route[req.method] && static_route[req.method](req,res))
		main_route = static_route[req.method];
	else
		main_route = no_method;
	main_route(req,res);
};
var server = http.createServer(ConnectionListener);
server.listen(8088);
console.log('server is listening at port 8088');