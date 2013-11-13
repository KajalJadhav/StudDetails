var test = {};
var sd = require('./library.js').sd;
var mocks_fs = require('./mocks.js').mocks_fs;
var assert = require('assert');
var mockfs = require('./mockfs.js').mockfs;

var getRecordbyroll = function(roll,text){
	var data = JSON.parse(text);
	// console.log(data[roll])
	return data[roll];
};

test._1_gives_list_of_one_student = function() {
	var data = {100:{RollNo:100,Name:"Kajal",Percentage:76}};
	var text = JSON.stringify(data);
	var expected = ["RollNo\t\t\tName\t\t\tPercentage","100\t\t\tKajal\t\t\t76"];
	var actual = sd.list(text).split('\r\n');
	assert.deepEqual(expected,actual);
};

test._2_gives_message_if_no_records_found = function() {
	var data = {};
	var text = JSON.stringify(data);
	var expected = 'No records available';
	var actual = sd.list(text);
	assert.equal(expected,actual);
};
test._3_gives_list_of_all_students = function() {
	var data = {100:{RollNo:100,Name:"Kajal",Percentage:76},
				110:{RollNo:110,Name:"Sayali",Percentage:76}};
	var text = JSON.stringify(data);
	var expected = ["RollNo\t\t\tName\t\t\tPercentage","100\t\t\tKajal\t\t\t76","110\t\t\tSayali\t\t\t76"];
	var actual = sd.list(text).split('\r\n');
	assert.deepEqual(expected,actual);
};

test._4_addDetail_will_write_into_records = function(){
	mockfs.data = '{}';
	sd.fs = mockfs;
	var recordBeforeAdd = getRecordbyroll(100,mockfs.data);
	assert.equal(undefined,recordBeforeAdd);
	sd.addDetail(100,'Shital',70);
	var recordAfterAdd = getRecordbyroll(100,mockfs.data);
	var expected = {RollNo:100,Name:"Shital",Percentage:70};
	assert.deepEqual(expected,recordAfterAdd);	
};

test._5_gives_message_if_record_already_exists = function() {
	var data = {100:{RollNo:100,Name:"Kajal",Percentage:76}};
	mockfs.data = JSON.stringify(data);
	sd.fs = mockfs;
	var expected = "Record already Exists.......";
	var actual = sd.addDetail(100,"Kajal",76);
	assert.deepEqual(expected,actual);
};

test._6_gives_message_if_rollNo_not_given = function() {
	var data = {100:{RollNo:100,Name:"Kajal",Percentage:76}};
	mockfs.data = JSON.stringify(data);
	sd.fs = mockfs;
	var expected = "RollNo is mandatory.....";
	var actual = sd.addDetail(null,"Kajal",76);
	assert.deepEqual(expected,actual);
};
test._7_gives_message_if_rollNo_not_given = function() {
	var data = {};
	mockfs.data = JSON.stringify(data);
	sd.fs = mockfs;
	var expected = ["RollNo\t\t\tName\t\t\tPercentage","100\t\t\tKajal\t\t\t76"];
	var actual = sd.addDetail(100,"Kajal",76).split('\r\n');
	assert.deepEqual(expected,actual);
};

test._8_finds_the_record_of_given_rollNo_100 = function(){
	var data = {100:{RollNo:100,Name:"Kajal",Percentage:76}};
	mockfs.data = JSON.stringify(data);
	sd.fs = mockfs;
	var expected = ["RollNo\t\t\tName\t\t\tPercentage","100\t\t\tKajal\t\t\t76"].join("\r\n");
	var actual = sd.searchRecord(JSON.stringify(data),100);
	assert.deepEqual(expected,actual); 
};

test._9_gives_message_if_record_not_found = function(){
	var data = {100:{RollNo:100,Name:"Kajal",Percentage:76}};
	mockfs.data = JSON.stringify(data);
	sd.fs = mockfs;
	var expected = "Record not Present";
	var actual = sd.searchRecord(JSON.stringify(data),101);
	assert.deepEqual(expected,actual); 
};

test._10_gives_message_if_roll_number_is_not_specified = function(){
	var data = {100:{RollNo:100,Name:"Kajal",Percentage:76}};
	mockfs.data = JSON.stringify(data);
	sd.fs = mockfs;
	var expected = "Please specify fieldValue to be searched";
	var actual = sd.searchRecord(JSON.stringify(data),null);
	assert.deepEqual(expected,actual); 
};

exports.test = test;