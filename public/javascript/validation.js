var numValidation = function(evt){
    var charCode = event.keyCode
    // console.log(charCode)
    if (charCode == 46 || (charCode > 47 && charCode < 58))
    	return true;
    alert('use only numbers');
    return false;
};

var validateRoll = function(){
	var roll = document.getElementsByName("roll")[0].value;
	if(!/^\d+$/.test(roll)){
		alert('invalid roll number.... Only give Integer value');
		return false;
	}
	return true;
}

var validateInputs = function(){
	var percent = document.getElementsByName("per")[0].value;
	var roll = document.getElementsByName("roll")[0].value;
	var name = document.getElementsByName("name")[0].value;
	if(!/^\d+$/.test(roll)){
		alert('invalid roll number.... Only give Integer value')
		return false;
	}
	if(!(/^[a-zA-Z]*[a-zA-Z.]+[a-zA-Z0-9]*$/.test(name))){
		alert('invalid name.. Give Proper Name');
		return false;
	};
	if((isNaN(percent)) || percent<0 ||percent>100){
		alert(' It"s invalid Percentage...');
		return false;
	};
	return true;
};