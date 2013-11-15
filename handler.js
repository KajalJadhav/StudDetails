var routes = {};
var fs = require('fs');
var home_page = fs.readFileSync('./public/html/index.html');
var add = fs.readFileSync('./public/html/add.html');
var search = fs.readFileSync('./public/html/search.html');
var sd = require('./library.js').sd;
var recordFileName = './record.txt';

var data = {rn:''};

routes['/'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(""+home_page);
	res.end();
}

routes['/list'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(sd.list(JSON.stringify(sd.records)));
	res.end();
};

routes['/add'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	if(!data.rn){
		res.write(add);
		res.end()
		return;
	}
	res.write(sd.addDetail(data.rn,data.name,data.percentage));
	res.end();
}
routes['/search'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	if(!data.rn){
		res.write(search);
		res.end()
		return;
	}
	var result = sd.searchRecord(JSON.stringify(sd.records),data.rn);
	res.write(result);
	res.end();
}
exports.data = data;
exports.routes = routes;