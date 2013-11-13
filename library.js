var http = require('http');
var fs = require("fs");
var sd = {};

sd.readData = function(fileName){
  return fs.readFileSync(fileName,'utf-8');
};

sd.addDetail = function(roll,name,percentage){
  var details = {RollNo:'',Name:'',Percentage:''};
  var result = {};
  if(!roll)
    return "RollNo is mandatory.....";
  details.RollNo = roll;
  details.Name = name;
  details.Percentage = percentage;
  var text = sd.readData('record.txt');
  var records = JSON.parse(text);
  if(records.hasOwnProperty(roll))
    return "Record already Exists.......";
  records[roll] = details;
  text = JSON.stringify(records);
  fs.writeFileSync('record.txt',text);
  result.added = details;
  return sd.list(JSON.stringify(result));
};

sd.list = function(text){
  var field = ["RollNo\t\t\tName\t\t\tPercentage\r\n"];
  if(text == '{}') return 'No records available';
  keysInRecord = Object.keys(JSON.parse(text));
  var text = JSON.parse(text);
  var result = [],index = 0;
  keysInRecord.forEach(function(fields){
    result[index] = text[fields].RollNo+'\t\t\t'+text[fields].Name+'\t\t\t'+text[fields].Percentage;
    index++;
  });
  return field+result.join('\r\n');
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
  var text = sd.readData("record.txt");
  var operations = {
    add : function(){return sd.addDetail(data.rn,data.name,data.percentage);},
    list : function(){return sd.list(text);},
    search : function(){return sd.searchRecord(text,data.rn);}
  };
  var no_method = function(args)
  {return "The available functionalities are\n 1. Add \n 2. List \n 3. Search";};
  var method = operations[methodName] || no_method;
  return method();
};
exports.sd = sd;
