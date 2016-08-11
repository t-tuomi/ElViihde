
var elBaseURL = "http://api.elisaviihde.fi/etvrecorder/";
var elViewArray = new Array();
var elCurrentView;
var nrOfTableRows = 11; // max index value actually..

if (!REAL) {
	var tvKey = new Object();
	tvKey.KEY_DOWN = 40;
	tvKey.KEY_UP = 38;
	tvKey.KEY_PLAY = 13;
	tvKey.KEY_STOP = 66;
	tvKey.KEY_RETURN = 65;
	tvKey.KEY_RETURN = 67;
	tvKey_KEY_PANEL_RETURN = 68;
}

function elInit() {

	var url;
	
	if (REAL) {
		Audio.init();
		Player.init();
		Resume.init();
		widgetAPI.sendReadyEvent(); 		
	}
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


function elPlay (url) {
	//var resume = 0;
	
	console.log("PLAY");
	console.log(elCurrentView);
	console.log(url);

	Player.setVideoURL(url);
	//Player.AVPlayer.setDisplayArea({top:0, left:0, width:960, height:540});
	Player.playVideo();
	Resume.loadResumePoint(elCurrentView.itemArray[elCurrentView.itemArrayIndex].id);
	//Main.setFullScreenMode();
}

function elHandleEnter() {
	
	console.log("enter");
	var url;
	
	switch(Player.getState()) {
	
	case Player.STOPPED:
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
			elPlay(elCurrentView.itemArray[elCurrentView.itemArrayIndex].program_info.url);
		}
		break;
		
	case Player.PLAYING:
		// pause
		break;
		
	case Player.PAUSED:
		// resume playing
		break;
		
	}
	

}

function elStoreResumePoint() {
	
	var id = elCurrentView.itemArray[elCurrentView.itemArrayIndex].id;
	var time = Player.time.millisecond;
	
	if (id && time) {
		Resume.storeResumePoint(id, time);
		Resume.writeFile();
	}
}

function elKeyHandler() {
	var keyCode = event.keyCode;
	//var url;
	//var table = document.getElementById("vlt");
    console.log("Key pressed: " + keyCode);

    switch(keyCode) {
    
    case tvKey.KEY_DOWN:
    	elCurrentView.keyDown();
    	break;
    
    case tvKey.KEY_UP:
    	elCurrentView.keyUp();
    	break;
    	
    case tvKey.KEY_ENTER:
    	console.log("enter");
    	elHandleEnter();
    	break;
    	
    case tvKey.KEY_STOP:

    	elStoreResumePoint();
    	Player.stopVideo();
    	Main.setWindowMode();
    	break;
    	
    case tvKey.KEY_BLUE:
    	break;
    	
	   case tvKey.KEY_RETURN:
      case tvKey.KEY_PANEL_RETURN:
          alert("RETURN");
          elStoreResumePoint();
          //Resume.writeFile();
          Resume.closeFile();
          Player.stopVideo();
          widgetAPI.sendReturnEvent(); 
          break;    
          break;
          
      case tvKey.KEY_RIGHT:
    	  if (Player.getState() == Player.PLAYING) {
    		  Player.skipForwardVideo(60);
    	  }
    	  break;
    	  
      case tvKey.KEY_LEFT:
    	  if (Player.getState() == Player.PLAYING) {
    		  Player.skipBackwardVideo(40);
    	  } else {
    		  if (Player.getState() == Player.STOPPED) {
    		    	console.log("return");
    		    	if (elViewArray.length > 1) {
    		    		elCurrentView.resetCursorBg();
    		    		elViewArray.pop();
    		    		elCurrentView = elViewArray[elViewArray.length - 1];
    		    		elCurrentView.drawMenu();
    		    	} 
    			  
    		  }
    	  }
    	  break;	
    	  
      case tvKey.KEY_INFO :
    	  if(Player.getState() == Player.PLAYING)
              Main.toggleMode();
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

