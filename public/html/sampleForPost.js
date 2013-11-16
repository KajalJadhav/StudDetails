var http = require('http');
var url = require('url');

var ConnectionListener = function (req,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	var fname = req.form("name");
	var city = req.form("city");
	console.log('coming');
	res.write("Dear ",fname);
	res.end();
};
var server = http.createServer(ConnectionListener);
server.listen(8088);
console.log('server is listening at port 8088');