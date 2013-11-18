var routes = {};
var fs = require('fs');
var sd = require('./library.js').sd;
var homeTemplate = fs.readFileSync('./template','utf-8');
var add_page = fs.readFileSync('./public/html/add.html','utf-8');
var message_html = sd.fs.readFileSync('./public/html/message.html','utf-8');

routes['GET/list.html'] = function(req,res){
	var result = sd.list(JSON.stringify(sd.records))
	result = result.replace(/{home}/,homeTemplate);
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(result);
	res.end();
};

var getPostValues = function(input){
	var details = [];
	var inputs = input.split('&');
	inputs.forEach(function(field){
		details.push((field.split('=')[1]));
	});
	if(details[1])
		details[1] = details[1].replace(/\+/g,' ').replace(/%40/g,'@');
	return details;
};

routes['POST/add'] = function(req,res){
	var onReadData = function(input){
		var details = getPostValues(input);
		var result = sd.addDetail(details[0],details[1],details[2]);
		result = result.replace(/{home}/,homeTemplate);
		result = result.replace(/{home}/,'');
		res.writeHead(200, {"Content-Type": "text/html"});	
		res.write(result);
		res.end();
	};
	req.setEncoding('utf8');
	req.on('data',onReadData);
};

routes['POST/search'] = function(req,res){
	var onReadData = function(input){
		input = input + '&';
  		var details = getPostValues(input);
		var result = sd.searchRecord(JSON.stringify(sd.records),details[0]);
		result = result.replace(/{home}/,homeTemplate);
		res.writeHead(200, {"Content-Type": "text/html"});		
		res.write(result);
		res.end();
	};
	req.setEncoding('utf8');
	req.on('data',onReadData);
};

routes['POST/delete'] = function(req,res){
	var onReadData = function(input){
		input = input + '&';
  		var details = getPostValues(input);
		var result = sd.removeRecord(JSON.stringify(sd.records),details[0]);
		result = result.replace(/{home}/,homeTemplate);
		res.writeHead(200, {"Content-Type": "text/html"});		
		res.write(result);
		res.end();
	};
	req.setEncoding('utf8');
	req.on('data',onReadData);
};

exports.routes = routes;