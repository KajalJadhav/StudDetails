var numValidation = function(evt){
    var charCode = event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
    	alert('use only numbers');
    	return false;
    };
	return true;
};
var validatePercentage = function(){
	var percent = document.getElementById("percent").value;
	if(percent<0||percent>100){
		alert(' It"s invalid...');
		return false
	};
	return true;
};