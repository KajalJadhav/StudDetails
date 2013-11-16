var routes = {};
var fs = require('fs');
var home_page = fs.readFileSync('./public/html/index.html');
var add_page = fs.readFileSync('./public/html/add.html');
var search_page = fs.readFileSync('./public/html/search.html');
var backgroundImage = fs.readFileSync('./public/images/students.jpg');
var bg = fs.readFileSync('./public/images/image.jpg');
var studentCSS = fs.readFileSync('./public/css/studentDetails.css');
var validation_js = fs.readFileSync('./public/javascript/validation.js');
var sd = require('./library.js').sd;
var recordFileName = './record.txt';

var data = {rn:''};

var showMethodPage = function(data,page,res){
	if(!data.rn){
		res.write(page);
		res.end()
		return true;
	};
	return false;
}

routes['/'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(""+home_page);
	res.end();
};

routes['/list'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(sd.list(JSON.stringify(sd.records)));
	res.end();
};

routes['/add'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	if(showMethodPage(data,add_page,res)) return 0;
	res.write(sd.addDetail(data.rn,data.name,data.percentage));
	res.end();
};
routes['/search'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	if(showMethodPage(data,search_page,res)) return 0;
	var result = sd.searchRecord(JSON.stringify(sd.records),data.rn);
	res.write(result);
	res.end();
};

routes['/validation'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/javascript"});
	res.write(validation_js);
	res.end();
};

routes['/students'] = function(req,res){
	res.writeHead(200, {"Content-Type": "image/jpeg"});
	res.write(backgroundImage);
	res.end();
};
routes['/image.jpg'] = function(req,res){
	res.writeHead(200, {"Content-Type": "image/jpeg"});
	res.write(bg);
	res.end();
};
routes['/studentDetails.css'] = function(req,res){
	res.writeHead(200, {"Content-Type": "text/css"});
	res.write(studentCSS);
	res.end();
};
exports.data = data;
exports.routes = routes;