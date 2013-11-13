var http = require('http');
var url = require('url');
var sd = require('./library.js').sd;

var ConnectionListener = function (req,res){
	var requrl = url.parse(req.url,true);
	res.writeHead(200, {"Content-Type": "text/plain"});
	var data = {};
	data.rn = requrl.query.RN;
	data.name = requrl.query.NM;
	data.percentage = requrl.query.per;
	var method = requrl.pathname.slice(1);
	var field = requrl.query
	res.write(" "+sd.perform(data,method));
	res.end();
};
var server = http.createServer(ConnectionListener);
server.listen(8088);