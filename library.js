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

sd.searchRecord = function(record,search,field){
  if(field == 'RollNo') field = 'RollNo'
  var data = JSON.parse(record);
  if(!search) return "Please specify record to be searched";
  var keysInRecord = Object.keys(data);
  var recordFields = ["RollNo", "Name", "Percentage"];
  if(field == null){
    var filteredKeys = keysInRecord.filter(function (key){
      return recordFields.some(function (field){
        var detail = !data[key][field] ? "" : data[key][field];
        return detail.toLowerCase().toString().indexOf(search.toLowerCase()) > -1
      });
    });
  }
  else
  {
    var filteredKeys = keysInRecord.filter(function(key){
      var detail = !data[key][field] ? "" : data[key][field];
      return detail.toLowerCase().toString().indexOf(search.toLowerCase()) > -1;
    });
  }
  var result = {}; 
  for (var counter = 0; counter < filteredKeys.length; counter++)
    result[filteredKeys[counter]] = data[filteredKeys[counter]];
  var result = sd.list(JSON.stringify(result));
  return result;    
};

sd.perform =  function(data,methodName){
  console.log(methodName);
  var text = sd.readData("record.txt");
  var operations = {
    add : function(){var res = {data : sd.addDetail(data.rn,data.name,data.percentage)};
                    return sd.list(JSON.stringify(res));},
    list : function(){return sd.list(text);},
    search : function(){return sd.searchRecord(text,data.rn,'RollNo');}
  };
  
  return operations[methodName]();
};
exports.sd = sd;
