var http = require('http');
var fs = require("fs");
var sd = {};

sd.readData = function(fileName){
  return fs.readFileSync(fileName,'utf-8');
}
sd.addDetail = function(roll,name,percentage){
  var details = {RollNo:'',Name:'',Percentage:''};
  details.RollNo = roll;
  details.Name = name;
  details.Percentage = percentage;
  var text = sd.readData('record.txt');
  var records = JSON.parse(text);
  records[roll] = details;
  text = JSON.stringify(records);
  fs.writeFileSync('record.txt',text);
  return details;
};

sd.list = function(text){
  var field = ["RollNo\t\tName\t\tPercentage\r\n"];
  if(text == '{}') return 'No records available';
  keysInRecord = Object.keys(JSON.parse(text));
  var text = JSON.parse(text);
  var result = [],index = 0;
  console.log(keysInRecord);
  keysInRecord.forEach(function(fields){
    result[index] = text[fields].RollNo+'\t\t'+text[fields].Name+'\t\t'+text[fields].Percentage;
    index++;
  });
  return field+result.join('\r\n');
};

sd.perform =  function(data,methodName){
  console.log(methodName);
  var text = sd.readData("record.txt");
  var operations = {
    add : function(){var res = {data : sd.addDetail(data.rn,data.name,data.percentage)};
                    return sd.list(JSON.stringify(res));},
    list : function(){return sd.list(text);}
  };
  
  return operations[methodName]();
};

exports.sd = sd;
