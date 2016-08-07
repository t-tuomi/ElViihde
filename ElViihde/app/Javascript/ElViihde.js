
var elBaseURL = "http://api.elisaviihde.fi/etvrecorder/";
var elViewArray = new Array();
var elCurrentView;
var nrOfTableRows = 11; // max index value actually..

function elInit() {

	var url;
	
    document.getElementById("anchor").focus();
	elVerifyLogin();
	url = elBaseURL + "ready.sl?readylist&folderid=&ajax=true";
	elLoadUrl(url, function() {
		//tt = new ElMenuView(this);
		elViewArray.push(Object.create(ElMenuView));
		elCurrentView = elViewArray[elViewArray.length - 1];
		elCurrentView.init(this.xhttp);
		//console.log(tt);
		console.log("and here 3");
		//elCurrentView.drawMenu();
		//console.log(elViewArray);
	}, null);
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



function elKeyHandler() {
	var keyCode = event.keyCode;
	var url;
	//var table = document.getElementById("vlt");
    console.log("Key pressed: " + keyCode);
    
    switch(keyCode) {
    
    case 40:
    	elCurrentView.keyDown();
    	break;
    
    case 38:
    	elCurrentView.keyUp();
    	break;
    	
    case 13:
    	console.log("enter");
    	if (elCurrentView.isFolder()) {
    		elCurrentView.clearMenu();
    		url = elBaseURL + "ready.sl?readylist&folderid=" + 
    			elCurrentView.itemArray[elCurrentView.itemArrayIndex].id + "&ajax=true";
    		elLoadUrl(url, function() {  
    			console.log("and here 4");
    			elCurrentView.resetCursorBg();
    			elViewArray.push(Object.create(ElMenuView));
    			elCurrentView = elViewArray[elViewArray.length - 1];
    			elCurrentView.init(this.xhttp);
    			console.log("SUBFOLDER:");
    			console.log(elCurrentView);
    		}, null);
    	} else {
    		//player.play)();
    		console.log("PLAY");
    		console.log(elCurrentView);
    		console.log(elCurrentView.itemArray[elCurrentView.itemArrayIndex].program_info.url);
    	}
    	break;
    	
    case 65:
    	console.log("return");
    	if (elViewArray.length > 1) {
    		elViewArray.pop();
    		elCurrentView = elViewArray[elViewArray.length - 1];
    		elCurrentView.drawMenu();
    	} else {
    		console.log("exit app....");
    	}
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



function elLoadUrl(url, cfunc, cdata) {
	//console.log("here");
	
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            cfunc.call({"xhttp" : xhttp, "cdata" : cdata});
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

