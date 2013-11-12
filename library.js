var http = require('http');
var fs = require("fs");
var sd = {};
var data,id,sum = 0;
sd.addDetail = function(roll,name,percentage){
  var details = {RollNo:'',Name:'',Percentage:''};
  details.RollNo = roll;
  details.Name = name;
  details.Percentage = percentage;
  var text = fs.readFileSync('record.txt','utf-8');
  var records = JSON.parse(text);
  records[roll] = details;
  text = JSON.stringify(records);
  fs.writeFileSync('record.txt',text);
  return details;
};

sd.perform =  function(data,methodName){
  var operations = {
    add : function(){return sd.addDetail(data.rn,data.name,data.percentage);}
  };
  console.log(methodName)
  return operations[methodName]();
};

exports.sd = sd;
