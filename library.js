var http = require('http');
var sd = {};
sd.fs = require("fs");
var list_html = sd.fs.readFileSync('./public/html/list.html','utf-8');
var message_html_add = sd.fs.readFileSync('./public/html/message.html','utf-8');
var message_html_search = sd.fs.readFileSync('./public/html/message.html','utf-8');
var message_html_list = sd.fs.readFileSync('./public/html/message.html','utf-8');
var message_html_delete = sd.fs.readFileSync('./public/html/message.html','utf-8');
var recordFileName = './record.txt';
sd.records = sd.fs.existsSync(recordFileName) && sd.fs.readFileSync(recordFileName,'utf-8') || '{}';
sd.records = JSON.parse(sd.records);


sd.writeData = function(text){
  sd.fs.writeFile(recordFileName,text,'utf-8');
}
sd.addDetail = function(roll,name,percentage){
  var details = {RollNo:'',Name:'',Percentage:''};
  var result = {};  
  details.RollNo = roll;
  details.Name = name || "";
  details.Percentage = percentage || "";
  if(sd.records.hasOwnProperty(roll)){
    result.added = sd.records[roll];
    var existRecord = sd.list(JSON.stringify(result));
    message_html_add = message_html_add.replace(/{message}/,('<h3>Record already Exists </h3>'+existRecord));
    return message_html_add;
  }
  sd.records[roll] = details;
  text = JSON.stringify(sd.records);
  sd.writeData(text);
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
  if(text == '{}') 
    return message_html_list.replace(/{message}/,'<h3>No student records available<h3/>');
  keysInRecord = Object.keys(JSON.parse(text));
  var text = JSON.parse(text);
  var result = [];
  keysInRecord.forEach(getFieldRecords(result,text));
  var temp = result.join('');
  return list_html.replace(/{list}/,temp);
};

sd.searchRecord = function(record,fieldValue){
  var data = JSON.parse(record);
  var result = {};
  if(!data.hasOwnProperty(fieldValue))
    return message_html_search.replace(/{message}/,'<h3> Record not Present </h3>');
  result[fieldValue] = data[fieldValue];
  return sd.list(JSON.stringify(result));
};

sd.removeRecord = function(record,fieldValue){
  var record = JSON.parse(record);
  var result = {};
  if(!record.hasOwnProperty(fieldValue)) 
    return message_html_delete.replace(/{message}/,'<h3> Record not Present </h3>');
  result[fieldValue] = record[fieldValue];
  delete record[fieldValue];
  sd.records = record;
  sd.writeData(JSON.stringify(record));
  return sd.list(JSON.stringify(result));
};

exports.sd = sd;