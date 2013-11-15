var http = require('http');
var sd = {};
sd.fs = require("fs");
var list = sd.fs.readFileSync('./public/html/list.html','utf-8');
var recordFileName = './public/text/record.txt';

sd.readData = function(){
  return sd.fs.readFileSync(recordFileName,'utf-8');
};
sd.writeData = function(text){
  sd.fs.writeFile(recordFileName,text,'utf-8');
}
sd.addDetail = function(roll,name,percentage){
  var details = {RollNo:'',Name:'',Percentage:''};
  var result = {};
  
  details.RollNo = roll;
  details.Name = name || "";
  details.Percentage = percentage || "";
  var onReadComplete = function(err,text){
    if(err) throw err;
    var records = JSON.parse(text);
    if(records.hasOwnProperty(roll))
      return "Record already Exists.......";
    records[roll] = details;
    text = JSON.stringify(records);
    sd.writeData(text);
  };
  sd.fs.readFile(recordFileName,'utf-8',onReadComplete);
  result.added = details;
  return sd.list(JSON.stringify(result));
};

var getFieldRecords = function(result,text){
  var index = 0;
  return function(fields){
    result[index] = '<tr><td>' + text[fields].RollNo+'</td><td>'+
    text[fields].Name+'</td><td>'+
    text[fields].Percentage+'</td></tr>';
    index++;
  };
};
sd.list = function(text){
  if(text == '{}') return 'No records available';
  keysInRecord = Object.keys(JSON.parse(text));
  var text = JSON.parse(text);
  var result = [];
  keysInRecord.forEach(getFieldRecords(result,text));
  var temp = result.join('');
  return list.replace(/{list}/,temp);
};

sd.searchRecord = function(record,fieldValue){
  var data = JSON.parse(record);
  if(!fieldValue) return "Please specify fieldValue to be searched";
  if(isNaN(fieldValue))
    return "RollNo should be Number....."
  var result = {};
  if(!data.hasOwnProperty(fieldValue))
    return "Record not Present";
  result[fieldValue] = data[fieldValue];
  return sd.list(JSON.stringify(result));
};

exports.sd = sd;