
var ElViihde = {
		
		baseURL : "http://api.elisaviihde.fi/etvrecorder/",
		DEBUG : 1,
		view: Array(),
		depth: 0
}

ElViihde.initElViihde = function () {

	ElViihde.debug("init started");
	ElViihde.doLogin();
	//Elviihde.getReadyList
	view[depth] = new MenuView();
	
}

ElViihde.doLogin = function () {
	
	this.loadUrl(this.baseURL + "/default.sl?username=" + Credentials.getUsername() + 
			"&password=" + Credentials.getPassword() +
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