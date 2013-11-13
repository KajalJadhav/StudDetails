var test = {};
var sd = require('./library.js').sd;
var mocks_fs = require('./mocks.js').mocks_fs;
var assert = require('assert');

test._1_gives_list_of_all_students = function() {
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

exports.test = test;