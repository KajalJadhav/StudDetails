var http = require('http');
var fs = require("fs");
var data,id,sum = 0;
var list = function(fileName){
	var data = readFileSync(fileName);
	return data;
}
var display = function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  data = request.url;
  id = require('url').parse(data,true);
  var path = id.pathname.substr(1);
  if(path == "list"){
  	response.write(list("record.txt"));
  }
  // response.write(data+"====="+JSON.stringify(id));
  response.end();
}
http.createServer(display).listen(8282);