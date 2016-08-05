
var elBaseURL = "http://api.elisaviihde.fi/etvrecorder/";
var elViewArray = [];
var elCurrentView;
	
function elInit() {

	var url;
	
    document.getElementById("anchor").focus();
	elVerifyLogin();
	url = elBaseURL + "ready.sl?readylist&ajax=true";
	elLoadUrl(url, function() {
		elViewArray.push(new ElMenuView(this));
		elCurrentView = elViewArray[elViewArray.length - 1];	
		console.log("and here 3");
	});
		
}

function elVerifyLogin() {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.open("GET", elBaseURL + "/default.sl?username=" + Credentials.getUsername() + 
			"&password=" + Credentials.getPassword() +
			"&ajax=true", false);
	xhttp.send();
	if (xhttp.responseText == "TRUE") {
		console.log("login response true");
		return true;
	}
	console.log("login response false");
	return false;
	
}

function ElMenuView(xhttp) {
	
	this.xhttp = xhttp;
	var cursorPos = 0;
	var menuIndex = 0;
	var MAX_CUR_POS = 10;
	var folder;
	var itemArray = [];
	
	console.log(xhttp);
	folder = eval( '(' + this.xhttp.responseText + ')' );
	console.log(folder);
	console.log(folder.ready_data[0].folders[1].name);
	
}

function elKeyHandler() {
	
}
function elLoadUrl(url, cfunc) {
	console.log("here");
	
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            cfunc.call(xhttp);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}







// ------------------------------------------------


//
//function some_function(arg1, arg2, callback) {
//
//  var my_number = Math.ceil(Math.random() *
//      (arg1 - arg2) + arg2);
//  // then we're done, so we'll call the callback and
//  // pass our result
//  callback(my_number);
//}
////call the function



function start() {
	
	//console.log("listissä");
	
	elInit();

//	some_function(5, 15, function(num) {
//	    // this anonymous function will run when the
//	    // callback is called
//	    console.log("callback called! " + num);
//	});

	
	
	
//	var l = [];
//	
//	l.push(new List(1, 2));
//	l.push(new List(3, 4));
//	console.log(l[1].a);
//	l[1].a = 5;
//	console.log(l);
//	//console.log(baseURL);

}

function List(a, b) {
	this.a = a;
	this.b = b;
}
var ElViihde = {
		
		baseURL : "http://api.elisaviihde.fi/etvrecorder/",
		DEBUG : 1,
		view: Array(),
		depth: 0
}

ElViihde.initElViihde = function () {

	ElViihde.debug("init started");
	//ElViihde.doLogin();
	//Elviihde.getReadyList
	
	//this.view[this.depth] = new MenuView.init();
	//view=new Array();
	var myarray = MenuView;
	myarray.push(new MenuView.init());
	this.view.push(MenuView);
	
	
	ElViihde.debug("Eka level: " + this.view.foo);
	this.view.foobar;
	//console.log(this.view[this.depth] instanceof MenuView);
	//this.view.foobar();
	ElViihde.debug(this.view.foo);
	//this.view.push(new MenuView.init());
	ElViihde.debug(this.showProps(this.view, "view"));
	
	
	var dump = JSON.stringify(MenuView, null, '\t');
	ElViihde.debug(dump);
}

ElViihde.showProps = function (obj, objName) {
	  var result = "";
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      result += objName + "." + i + " = " + obj[i] + "\n";
	    }
	  }
	  return result;
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