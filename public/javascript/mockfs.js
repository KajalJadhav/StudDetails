var mockfs = {};
mockfs.data = '';
mockfs.writeFileSync = function(filename,data){
	mockfs.data = data;
};
mockfs.readFileSync = function(){
	return mockfs.data;
};
exports.mockfs = mockfs;