var static_handler = {};
var fs = require('fs');
var homeTemplate = fs.readFileSync('./template','utf-8');
var url = require('url');
// var home_page = fs.readFileSync('./public/html/index.html','utf-8');
// var add_page = fs.readFileSync('./public/html/add.html','utf-8');
// var search_page = fs.readFileSync('./public/html/search.html','utf-8');
// var delete_page = fs.readFileSync('./public/html/delete.html','utf-8');
// var studImage = fs.readFileSync('./public/images/students.jpg');
// var searchImg = fs.readFileSync('./public/images/searchImg.jpg');
// var bg = fs.readFileSync('./public/images/back.jpg');
// var studentCSS = fs.readFileSync('./public/css/studentDetails.css');
// var validation_js = fs.readFileSync('./public/javascript/validation.js');
var sd = require('./library.js').sd;
var recordFileName = './record.txt';

var get_MIME_type = function(type){
	MIME_type = {};
	MIME_type['jpg'] = function(){return {"Content-Type":"image/jpeg"};};
	MIME_type['html'] = function(){return {"Content-Type":"text/html"};};
	MIME_type['css'] = function(){return {"Content-Type":"text/css"};};
	MIME_type['ico'] = function(){return {"Content-Type":"image/x-icon"};};
	MIME_type['js'] = function(){return {"Content-Type":"text/javascript"};};

	return MIME_type[type] && MIME_type[type] || false;
}

static_handler['GET'] = function(req,res){
	var requrl = url.parse(req.url,true);
	var request_for_ = requrl.pathname;
	var path = './public'
	if(request_for_ == '/')
		request_for_ += 'html/index.html';
	if(request_for_ == '/favicon.ico')
		request_for_ = '/images'+request_for_;
	var request_type = request_for_.split('.')[request_for_.split('.').length-1];
	var MIME_type = get_MIME_type(request_type);
	path += request_for_;

	var onReadHTMLFile = function(err,data){
		if(err) console.log(err);
		if(!data) return;
		data = data.replace(/{home}/,homeTemplate);
		res.writeHead(200,MIME_type);
		res.write(data);
		res.end();
	};

	var onReadOtherFiles = function(err,data){
		if(err) console.log(err);
		if(!data) return;
		res.writeHead(200,MIME_type);
		res.write(data);
		res.end();
	};

	if(!MIME_type){
		return MIME_type;
	}

	if(request_type=='html')
		fs.readFile(path,'utf-8',onReadHTMLFile);
	else
		fs.readFile(path,onReadOtherFiles);
	return true;
}
// static_handler['GET/'] = function(req,res){
// 	home_page = home_page.replace(/{home}/,homeTemplate);
// 	writePage(home_page,"text/html",res);
// };

// static_handler['GET/add.html'] = function(req,res){
// 	add_page = add_page.replace(/{home}/,homeTemplate);
// 	writePage(add_page,"text/html",res);
// };

// static_handler['GET/search.html'] = function(req,res){
// 	search_page = search_page.replace(/{home}/,homeTemplate);
// 	writePage(search_page,"text/html",res);
// };

// static_handler['GET/delete.html'] = function(req,res){
// 	delete_page = delete_page.replace(/{home}/,homeTemplate);
// 	writePage(delete_page,"text/html",res);
// };

// static_handler['GET/students.jpg'] = function(req,res){
// 	writePage(studImage,"image/jpeg",res);
// };
// static_handler['GET/searchImg.jpg'] = function(req,res){
// 	writePage(searchImg,"image/jpeg",res);
// };
// static_handler['GET/image.jpg'] = function(req,res){
// 	writePage(bg,"image/jpeg",res);
// };
// static_handler['GET/studentDetails.css'] = function(req,res){
// 	writePage(studentCSS,"text/css",res);
// };
// static_handler['GET/validate.js'] = function(req,res){
// 	writePage(validation_js,"text/javascript",res);
// };
exports.static_handler = static_handler;