var http = require('http');
var url = require('url');
var sd = require('./public/javascript/library.js').sd;
var routes = require('./public/javascript/handler').routes;
var data = require('./public/javascript/handler').data;

var no_method = function(req,res){
	return {content:sd.perform(),format:'text/html'};
};
var ConnectionListener = function (req,res){
	var requrl = url.parse(req.url,true);
	data.rn = requrl.query.roll;
	data.name = requrl.query.name;
	data.percentage = requrl.query.per;
	var method = requrl.pathname;
	var main_route_res = routes[method] || no_method;
	res.writeHead(200, {"Content-Type": main_route_res(req,res).format});
	res.write(main_route_res(req,res).content);
	res.end();
};
var server = http.createServer(ConnectionListener);
server.listen(8088);
console.log('server is listening at port 8088');