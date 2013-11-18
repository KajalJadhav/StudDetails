var static_handler = {};
var fs = require('fs');
var home_page = fs.readFileSync('./public/html/index.html','utf-8');
var add_page = fs.readFileSync('./public/html/add.html','utf-8');
var search_page = fs.readFileSync('./public/html/search.html','utf-8');
var delete_page = fs.readFileSync('./public/html/delete.html','utf-8');
var studImage = fs.readFileSync('./public/images/students.jpg');
var searchImg = fs.readFileSync('./public/images/searchImg.jpg');
var bg = fs.readFileSync('./public/images/back.jpg');
var studentCSS = fs.readFileSync('./public/css/studentDetails.css');
var validation_js = fs.readFileSync('./public/javascript/validation.js');
var sd = require('./library.js').sd;
var recordFileName = './record.txt';
var homeTemplate = fs.readFileSync('./template','utf-8');

var writePage = function(page_content,MIME_type,res){
	res.writeHead(200,{"Content-Type":MIME_type});
	res.write(page_content);
	res.end();
}
static_handler['GET/'] = function(req,res){
	home_page=home_page.replace(/{home}/,homeTemplate);
	writePage(home_page,"text/html",res);
};

static_handler['GET/add.html'] = function(req,res){
	add_page = add_page.replace(/{home}/,homeTemplate);
	writePage(add_page,"text/html",res);
};

static_handler['GET/search.html'] = function(req,res){
	search_page = search_page.replace(/{home}/,homeTemplate);
	writePage(search_page,"text/html",res);
};

static_handler['GET/delete.html'] = function(req,res){
	delete_page = delete_page.replace(/{home}/,homeTemplate);
	writePage(delete_page,"text/html",res);
};

static_handler['GET/students.jpg'] = function(req,res){
	writePage(studImage,"image/jpeg",res);
};
static_handler['GET/searchImg.jpg'] = function(req,res){
	writePage(searchImg,"image/jpeg",res);
};
static_handler['GET/image.jpg'] = function(req,res){
	writePage(bg,"image/jpeg",res);
};
static_handler['GET/studentDetails.css'] = function(req,res){
	writePage(studentCSS,"text/css",res);
};
static_handler['GET/validate.js'] = function(req,res){
	writePage(validation_js,"text/javascript",res);
};
exports.static_handler = static_handler;