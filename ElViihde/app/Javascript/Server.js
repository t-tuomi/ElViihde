var Server =
{
    /* Callback function to be set by client */
    dataReceivedCallback : null,
    
    XHRObj : null,
    url : "app/XML/videoList.xml"
}

Server.init = function()
{
    var success = true;

    if (this.XHRObj)
    {
        this.XHRObj.destroy();  // Save memory
        this.XHRObj = null;
    }
    
    return success;
}

Server.fetchVideoList = function()
{
	alert("trying to...");
    if (this.XHRObj == null)
    {
        this.XHRObj = new XMLHttpRequest();
    }
    
    if (this.XHRObj)
    {
        this.XHRObj.onreadystatechange = function()
            {
                if (Server.XHRObj.readyState == 4)
                {
                    Server.createVideoList();
                }
            }
            
        this.XHRObj.open("GET", this.url, true);
        this.XHRObj.send(null);
    	alert("(Server.js) trying to... 2 " +  this.url);
     }
    else
    {
        alert("Failed to create XHR");
    }
}

Server.createVideoList = function()
{
    if (this.XHRObj.status != 200)
    {
        Display.status("XML Server Error " + this.XHRObj.status);
    }
    else
    {
        var xmlElement = this.XHRObj.responseXML.documentElement;
        
        if (!xmlElement)
        {
            alert("Failed to get valid XML");
        }
        else
        {
            // Parse RSS
            // Get all "item" elements
            var items = xmlElement.getElementsByTagName("item");
            
            var videoNames = [ ];
            var videoURLs = [ ];
            var videoDescriptions = [ ];
            
            for (var index = 0; index < items.length; index++)
            {
                var titleElement = items[index].getElementsByTagName("title")[0];
                var descriptionElement = items[index].getElementsByTagName("description")[0];
                var linkElement = items[index].getElementsByTagName("link")[0];
                if (titleElement && descriptionElement && linkElement)
                {
                    videoNames[index] = titleElement.firstChild.data;
                   
                    if(linkElement.firstChild.data.substring(0,4) !="http"){
                    	alert("asdasdasd  "+linkElement.firstChild.data.substring(0,4));
                    	var rootPath = window.location.href.substring(0, location.href.lastIndexOf("/")+1);
            	    	var Abs_path = unescape(rootPath).split("file://")[1]+linkElement.firstChild.data;
            	    	videoURLs[index] = Abs_path;  	   	
            	    }
                    else{
                    	videoURLs[index] = linkElement.firstChild.data;                        	
                    }
                    videoDescriptions[index] = descriptionElement.firstChild.data;
                }
            }
        
            Data.setVideoNames(videoNames);
            Data.setVideoURLs(videoURLs);
            Data.setVideoDescriptions(videoDescriptions);
            
            if (this.dataReceivedCallback)
            {
                this.dataReceivedCallback();    /* Notify all data is received and stored */
            }
        }
    }
}
