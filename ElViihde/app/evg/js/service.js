service =
{
		
		fooFunction: function() 
		{
			return "HHHHHYUYYYYY";
		},
	getChannels: function(cb)
	{
		var url = this.baseUrl + "/ajaxprograminfo.sl?channels";
		this.send(url, cb);
	},

	getPrograms: function(channel, cb)
	{
		var url = this.baseUrl + "/ajaxprograminfo.sl?24h=" + channel;
		this.send(url, cb);
	},
	
	getProgram: function(programId, cb)
	{
		var url = this.baseUrl + "/program.sl?programid=" + programId + "&ajax=true";
		this.send(url, cb);
	},

	getReadyList: function(folder, cb)
	{
		var url = this.baseUrl;
		if (folder == null)
			url += "/ready.sl?folderid=&ajax=true";
		else
			url += "/ready.sl?folderid=" + folder + "&ppos=0&ajax=true";
		this.send(url, cb);
	},
	
	getRecordingList: function(cb)
	{
		var url = this.baseUrl + "/recordings.sl?ajax=true";
		this.send(url, cb);
	},

    getWildcardList: function(cb, data)
    {
		var url = this.baseUrl + "/wildcards.sl?ajax=true";
		this.send(url, cb, data);
    },

    getTopList: function(cb)
    {
		var url = this.baseUrl + "/etvrecorder/channels.sl?ajax=true";
		this.send(url, cb);
    },

    addWildcard: function(channel, wildcard, folderId, cb)
    {
        var url = this.baseUrl + "/wildcards.sl?channel=" + channel + "&folderId=" + folderId + "&wildcard=" + wildcard + "&record=true&ajax=true";
		this.send(url, cb);
    },
    
    removeWildcard: function(recordingId, cb)
    {
        var url = this.baseUrl + "/wildcards.sl?remover=" + recordingId + "&ajax=true";
        this.send(url, cb);
    },

    addRecording: function(programId, cb)
    {
        var url = this.baseUrl + "/program.sl?programid=" + programId + "&record=" + programId + "&ajax=true";
        this.send(url, cb);
    },

    removeRecording: function(recordingId, cb)
    {
        var url = this.baseUrl + "/program.sl?remover=" + recordingId + "&ajax=true";
        this.send(url, cb);
    },

    removeReady: function(programViewId, cb)
    {
        var url = this.baseUrl + "/program.sl?remove=true&removep=" + programViewId + "&ajax=true";
        this.send(url, cb);
    },

	check: function(username, password)
	{
	    var success = this.login(username, password);
	    this.logout();
	    return success;
	},

	login: function(username, password)
	{
		if (username == null)
		    //username = System.Gadget.Settings.readString("username");
			username = "XXXXX";
		
		if (password == null)
		//    password = System.Gadget.Settings.readString("password");
			password = "XXXXX";
		
		var url = this.baseUrl + "/default.sl?username=" + username + "&password=" + password + "&ajax=true";
		var request = this.send(url, null);
		return (request.request.responseText.indexOf("TRUE") == 0);
	},
	
	logout: function()
	{
		var url = this.baseUrl + "/logout.sl?ajax=true";
		this.send(url, null);
	},

	send: function(url, cb, cbData)
	{
		
//	    if (System.Gadget.Settings.read("credentialsUpdated"))
//        {
//            System.Gadget.Settings.write("credentialsUpdated", false);
//            this.logout();
//        }
	    
	    var request = new Object();
	    request.url = url;
	    request.callback = cb;
	    request.callbackData = cbData;
	    request.attemptLoginOnError = true;
        return this.sendRequest(request);	    
	},
	
	sendRequest: function(request)
	{
		
	    if (request.callback != null)
	    {
	    	
	    	request.request = new XMLHttpRequest();
            request.request.onreadystatechange = function() { service.onRequestReadyStateChange(request); };
            request.request.open("GET", this.killCache(request.url), true);
            request.request.send();
	    }
	    else
	    {
	    	 	request.request = new XMLHttpRequest();
            request.request.open("GET", this.killCache(request.url), false);
            request.request.send();
	    }
	    
	    return request;
	},
	
	onRequestReadyStateChange: function(request)
	{
	    if (request.request.readyState == 4)
	    {
	        if (request.request.responseText.indexOf('"evlogin"') != -1)
	        {
	            if (request.attemptLoginOnError)
	            {
	            	alert("yrittää logata");
	                if (service.login())
	                {
	                    request.attemptLoginOnError = false;
	                    service.sendRequest(request);
	                }
	            }
	        }
	        else
	        {
                request.callback(request);	        
            }
	    }
	},
	
	parse: function(request)
	{
	    //return eval(request.request.responseText);
	    return eval('(' + request.request.responseText + ')');

	   // --no-first-run --activate-on-launch --no-default-browser-check --allow-file-access-from-files --disable-web-security --disable-translate --proxy-auto-detect --proxy-bypass-list=127.0.0.1
	    
	},
	
	killCache: function(url)
	{
	    url += (url.indexOf('?') == -1 ? '?' : '&');
	    url += "killcache=" + Math.random();
	    return url;
	},
	
	convert: function(text)
	{
		return utf8.decode(unescape(text));
	},
	
	baseUrl: 'http://api.elisaviihde.fi/etvrecorder'
	//baseUrl: 'http://127.0.0.1'
};