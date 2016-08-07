
var elBaseURL = "http://api.elisaviihde.fi/etvrecorder/";
var elViewArray = [];
var elCurrentView;
var nrOfTableRows = 13 - 1;

var tt;

function elInit() {

	var url;
	
    document.getElementById("anchor").focus();
	elVerifyLogin();
	url = elBaseURL + "ready.sl?readylist&ajax=true";
	elLoadUrl(url, function() {
		//tt = new ElMenuView(this);
		elViewArray.push(new ElMenuView(this));
		elCurrentView = elViewArray[elViewArray.length - 1];
		//console.log(tt);
		//console.log("and here 3");
		elCurrentView.drawMenu();
		//console.log(elViewArray);
	});
	//elDrawMenu();
		
}

function elVerifyLogin() {
	
	var xhttp = new XMLHttpRequest();
	
	// async = false tässä, kun menee muuten niin hankalaks eikä pitäis kauaa mennä haussa
	
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


// -------------------------------------------------

function ElMenuView(xhttp) {
	
	this.xhttp = xhttp;
	this.cursorPos = 0;
	this.itemArrayIndex = 0;
	this.folder = eval( '(' + this.xhttp.responseText + ')' );
	this.itemArray = [];
	this.maxCurPos;
	
	//console.log(xhttp);
	console.log(this.folder);
	//console.log(folder.ready_data[0].folders[1].name);
	
	this.itemArray = this.folder.ready_data[0].folders.concat(this.folder.ready_data[0].recordings);
	this.maxCurPos = nrOfTableRows > this.itemArray.length - 1 ? this.itemArray.lenght - 1 : nrOfTableRows;
	console.log("maxcurpos: " + this.maxCurPos);
	
	function keyDown() {
		console.log("key down");
    	
    	console.log(this.cursorPos + " -- " + this.maxCurPos + " -- " + this.itemArrayIndex);
    	table.rows[this.cursorPos].cells[0].style.backgroundColor = "black";
    	if (this.cursorPos < this.maxCurPos - 1) {
    		console.log("joo on");
    		this.cursorPos++;
    		this.itemArrayIndex++;
    	} else {
    		if (this.itemArrayIndex < this.itemArray.length - 1) {
    			this.itemArrayIndex++;
    			this.drawMenu(); 
    		}
    	}
    	
    	table.rows[this.cursorPos].cells[0].style.backgroundColor = "grey";
    	
	}
	
	function keyUp() {
		console.log("key up");
   
    	console.log(this.cursorPos + " -- " + this.maxCurPos + " -- " + this.itemArrayIndex);
    	table.rows[this.cursorPos].cells[0].style.backgroundColor = "black";
    	if (this.cursorPos > 0) {
    		console.log("joo on > 0");
    		this.cursorPos--;
    		this.itemArrayIndex--;
    	} else {
    		if (this.itemArrayIndex < 0) {
    			this.itemArrayIndex--;
    			this.drawMenu(); 
    		}
    	}
    	table.rows[this.cursorPos].cells[0].style.backgroundColor = "grey";  	
	}
	
	
	
	function drawMenu() {
		var table = document.getElementById("vlt");
		//table.rows[2].cells[0].innerHTML = "foooff";
		var i;
		console.log("elCurrentView:");
		console.log(this);
		//for (i = elCurrentView.itemArrayIndex - elCurrentView.cursorPos; i < elCurrentView.itemArrayIndex + nrOfTableRows; i++) {
		for (i = 0; i < nrOfTableRows; i++) {
			if (i + this.itemArrayIndex < this.itemArray.length) {
				table.rows[i].cells[0].innerHTML = this.itemArray[i + this.itemArrayIndex].name;
			} else {
				table.rows[i].cells[0].innerHTML = "";
			}
			//console.log(table.rows[i].cells[0].innerHTML);
		}
		table.rows[this.cursorPos].cells[0].style.backgroundColor = "grey";

	}
}



function elKeyHandler() {
	var keyCode = event.keyCode;
	//var table = document.getElementById("vlt");
    console.log("Key pressed: " + keyCode);
    
    switch(keyCode) {
    
    case 40:
    	elCurrentView.keyDown();
    	break;
    
    case 38:
    	elCurrentView.keyUp();
    	break;
    }
    
//    switch(keyCode)
//    {
//	    case tvKey.KEY_RED:
//	    	 sf.service.setScreenSaver(true);
//	    	break;
//	    case tvKey.KEY_GREEN:
//	    	 sf.service.setScreenSaver(true, 100);
//	       	break;
//	    case tvKey.KEY_YELLOW:
//	    	sf.service.AVSetting.show(function asd(){
//				Main.enableKeys();
//	    	});
//	    	
//	    	 break;
//	    case tvKey.KEY_BLUE:
//	    	sf.service.AVSetting.hide();
//	    	break;
//	    case tvKey.KEY_RETURN:
//        case tvKey.KEY_PANEL_RETURN:
//            alert("RETURN");
//            Player.stopVideo();
//            widgetAPI.sendReturnEvent(); 
//            break;    
//            break;
//    
//        case tvKey.KEY_PLAY:
//            alert("PLAY");
//            
//            this.handlePlayKey();
//            break;
//            
//        case tvKey.KEY_STOP:
//            alert("STOP");
//            Player.stopVideo();
//            break;
//            
//        case tvKey.KEY_PAUSE:
//            alert("PAUSE");
//            this.handlePauseKey();
//            break;
//            
//        case tvKey.KEY_FF:
//            alert("FF");
//            if(Player.getState() != Player.PAUSED)
//                Player.skipForwardVideo();
//            break;
//        
//        case tvKey.KEY_RW:
//            alert("RW");
//            if(Player.getState() != Player.PAUSED)
//                Player.skipBackwardVideo();
//            break;
//
//        case tvKey.KEY_VOL_UP:
//        case tvKey.KEY_PANEL_VOL_UP:
//            alert("VOL_UP");
//            if(this.mute == 0)
//                Audio.setRelativeVolume(0);
//            break;
//            
//        case tvKey.KEY_VOL_DOWN:
//        case tvKey.KEY_PANEL_VOL_DOWN:
//            alert("VOL_DOWN");
//            if(this.mute == 0)
//                Audio.setRelativeVolume(1);
//            break;      
//
//        case tvKey.KEY_DOWN:
//            alert("DOWN");
//            break;
//            
//        case tvKey.KEY_UP:
//            alert("UP");
//            break;            
//
//        case tvKey.KEY_ENTER:
//        case tvKey.KEY_PANEL_ENTER:
//            alert("ENTER");
//            if(Player.getState() == Player.PLAYING)
//              this.toggleMode();
//            break;
//        
//        case tvKey.KEY_MUTE:
//            alert("MUTE");
//            this.muteMode();
//            break;
//            
//        default:
//            alert("Unhandled key");
//            break;
//    }
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