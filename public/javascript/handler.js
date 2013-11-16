var routes = {};
var fs = require('fs');
var home_page = fs.readFileSync('./public/html/index.html');
var add = fs.readFileSync('./public/html/add.html');
var search = fs.readFileSync('./public/html/search.html');
var imgBack = fs.readFileSync('./public/images/back.jpg');
var style = fs.readFileSync('./public/css/style.css');
var links = fs.readFileSync('./public/javascript/links');
var sd = require('./library.js').sd;

var data = {rn:''};
routes['/'] = function(req,res){
	return home_page.toString();
}
routes['/list'] = function(req,res){
	return sd.perform('','list');
}
routes['/add'] = function(req,res){
	if(!data.rn)
		return add.toString();
	return sd.perform(data,'add');
}
routes['/search'] = function(req,res){
	if(!data.rn)
		return search.toString();
	return sd.perform(data,'search');
}
routes['/back.jpg'] = function(req,res){
	res.writeHead(200,{'Content-Type': 'image/css'});
	return imgBack;
}

exports.data = data;
exports.routes = routes;