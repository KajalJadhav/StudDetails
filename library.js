var http = require('http');
var fs = require("fs");
var sd = {};
sd.list = function(filename){
	var records = fs.readFileSync(filename);
	var field = ["RollNo  Name  Percentage\r\n"];
	if(records == '{}') return 'No records available';
	keysInRecords = Object.keys(JSON.parse(records));
	var records = JSON.parse(records);
	var result = [],index = 0;
	keysInRecords.forEach(function(fields){
		result[index] = records[fields].rn+'   '+records[fields].nm+'   '+records[fields].pr;
		index++;
	});
	return field+result.join('\r\n');
};
var display = function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  data = request.url;
  id = require('url').parse(data,true);
  var path = id.pathname.substr(1);
  if(path == "list"){
  	response.write(sd.list("record.txt"));
  }
  response.end();
}
http.createServer(display).listen(8082);