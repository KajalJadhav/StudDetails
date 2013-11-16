var routes = {};
var fs = require('fs');
var sd = require('./library.js').sd;
var homeTemplate = fs.readFileSync('./template','utf-8');
var add_page = fs.readFileSync('./public/html/add.html','utf-8');

routes['GET/list.html'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(sd.list(JSON.stringify(sd.records)));
	res.end();
};

var getPostValues = function(input){
	var details = [];
	var inputs = input.split('&');
	inputs.forEach(function(field){
		details.push(field.split('=')[1]);
	});
	return details;
};

routes['POST/add'] = function(req,res){
	var onReadData = function(input){
		var details = getPostValues(input);
		// var res = sd.addDetail(details[0],details[1],details[2]);
		// homeTemplate = homeTemplate.replace(/{home}/,res);
		res.writeHead(200, {"Content-Type": "text/html"});	
		res.write(sd.addDetail(details[0],details[1],details[2]));
		res.end();
	};
	req.setEncoding('utf8');
	req.on('data',onReadData);
};

routes['POST/search'] = function(req,res){
	var onReadData = function(input){
		input = input + '&';
		var details = getPostValues(input)
		res.writeHead(200, {"Content-Type": "text/html"});		
		res.write(sd.searchRecord(JSON.stringify(sd.records),details[0]));
		res.end();
	};
	req.setEncoding('utf8');
	req.on('data',onReadData);
};

exports.routes = routes;