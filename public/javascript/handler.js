var routes = {};
var fs = require('fs');
var home_page = fs.readFileSync('./public/html/index.html');
var add = fs.readFileSync('./public/html/add.html');
var search = fs.readFileSync('./public/html/search.html');
var backgroundImage = fs.readFileSync('./public/images/students.jpg');
var bg = fs.readFileSync('./public/images/image.jpg');
var studentCSS = fs.readFileSync('./public/css/studentDetails.css');
var sd = require('./library.js').sd;

var data = {rn:''};
var res = {content:'',format:'text/html'};
routes['/'] = function(req,res){
	res.content = home_page.toString();
	res.format = 'text/html';
	return res;
}
routes['/list'] = function(req,res){
	res.content = sd.perform('','list');
	res.format = 'text/html';
	return res;
}
routes['/add'] = function(req,res){
	if(!data.rn)
		res.content = add.toString();
	res.content = sd.perform(data,'add');
	res.format = 'text/html';
	return res;
}
routes['/search'] = function(req,res){
	if(!data.rn)
		res.content = search.toString();
	res.content = sd.perform(data,'search');
	res.format = 'text/html';
	return res;
}
routes['/students.jpg'] = function(req,res){
	res.content = backgroundImage;
	res.format = 'image/jpeg';
	// console.log(backgroundImage);
	return res;
}
routes['/image.jpg'] = function(req,res){
	res.content = bg;
	res.format = 'image/jpeg';
	// console.log(backgroundImage);
	return res;
}
routes['/studentDetails.css'] = function(req,res){
	res.content = studentCSS;
	res.format = 'text/css';
	return res;
}
exports.data = data;
exports.routes = routes;