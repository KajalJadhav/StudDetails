var http = require('http');
var url = require('url');
var fs = require('fs');
var home_page = fs.readFileSync('index.html');
var add = fs.readFileSync('add.html');
var search = fs.readFileSync('search.html');
var sd = require('./library.js').sd;

var data = {rn:''};
var routes = {};
routes['/'] = function(req,res){
	return home_page.toString();
	res.end();
}
routes['/list'] = function(req,res){
	return sd.perform('','list');
	res.end();
}
routes['/add'] = function(req,res){
	if(!data.rn)
		return add.toString();
	return sd.perform(data,'add');
	res.end();
}
routes['/search'] = function(req,res){
	if(!data.rn)
		return search.toString();
	return sd.perform(data,'search');
	res.end();
}
var no_method = function(req,res){
	return sd.perform();
	res.end();
};
var ConnectionListener = function (req,res){
	var requrl = url.parse(req.url,true);
	res.writeHead(200, {"Content-Type": "text/html"});
	data.rn = requrl.query.roll;
	data.name = requrl.query.name;
	data.percentage = requrl.query.per;
	var method = requrl.pathname;
	var main_route = routes[method] || no_method;
	res.write("<h3>" + main_route(req,res).replace(/\r\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;') + "</h3>");
	res.end();
};
var server = http.createServer(ConnectionListener);
server.listen(8088);