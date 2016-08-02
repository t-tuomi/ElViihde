
var ElViihde = {
		
		baseURL : "http://api.elisaviihde.fi/etvrecorder/",
		DEBUG : 1
		//xhttp: new XMLHttpRequest()
}

ElViihde.initElViihde = function () {

	ElViihde.debug("init started");
	ElViihde.doLogin();
	Elviihde.getReadyList
}

ElViihde.doLogin = function () {
	
	this.loadUrl(this.baseURL + "/default.sl?username=" + Credentials.username + 
			"&password=" + Credentials.password +
			"&ajax=true", this.processLogin);
	
}

ElViihde.processLogin = function(xhttp) {
	ElViihde.debug(xhttp.responseText);
}

ElViihde.loadUrl = function (url, cfunc) {
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            cfunc(xhttp);
        }
    };
xhttp.open("GET", url, true);
xhttp.send();
}

ElViihde.debug = function (msg) {
	if (this.DEBUG) {
		console.log("Debug: " + msg);
	}
}