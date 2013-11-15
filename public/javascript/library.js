var http = require('http');
var sd = {};
sd.fs = require("fs");
var list = sd.fs.readFileSync('./public/html/list.html','utf-8');
var recordFileName = './public/text/record.txt';

sd.readData = function(){
  return sd.fs.readFileSync(recordFileName,'utf-8');
};
sd.writeData = function(text){
  sd.fs.writeFileSync(recordFileName,text,'utf-8');
}
sd.addDetail = function(roll,name,percentage){
  var details = {RollNo:'',Name:'',Percentage:''};
  var result = {};
  if(!roll)
    return "RollNo is mandatory.....";
  details.RollNo = roll;
  details.Name = name || "";
  details.Percentage = percentage || "";
  var text = sd.readData();
  var records = JSON.parse(text);
  if(records.hasOwnProperty(roll))
    return "Record already Exists.......";
  records[roll] = details;
  text = JSON.stringify(records);
  sd.writeData(text);
  result.added = details;
  return sd.list(JSON.stringify(result));
};

sd.list = function(text){
  // var tab = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  // var field = ["RollNo" + tab + "Name" + tab + "Percentage<br/>"];
  if(text == '{}') return 'No records available';
  keysInRecord = Object.keys(JSON.parse(text));
  var text = JSON.parse(text);
  var result = [],index = 0;
  keysInRecord.forEach(function(fields){
    result[index] = '<tr><td>' + text[fields].RollNo+'</td><td>'+
    text[fields].Name+'</td><td>'+
    text[fields].Percentage+'</td></tr>';
    index++;
  });
  var temp = result.join('');
  return list.replace(/{list}/,temp);
};

sd.searchRecord = function(record,fieldValue){
  var data = JSON.parse(record);
  if(!fieldValue) return "Please specify fieldValue to be searched";
  var result = {};
  if(!data.hasOwnProperty(fieldValue))
    return "Record not Present";
  result[fieldValue] = data[fieldValue];
  return sd.list(JSON.stringify(result));
};
sd.perform =  function(data,methodName){
  var text = sd.readData(recordFileName);
  var operations = {
    add : function(){return sd.addDetail(data.rn,data.name,data.percentage);},
    list : function(){return sd.list(text);},
    search : function(){return sd.searchRecord(text,data.rn);}
  };
  var no_method = function(args){
    return "The available functionalities are<br/> 1. Add <br/> 2. List <br/> 3. Search";
  };
  return (operations[methodName] && operations[methodName]() || no_method());
};
exports.sd = sd;
