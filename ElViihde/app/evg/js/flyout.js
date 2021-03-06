// Mouse wheel support

window.onmousewheel = document.onmousewheel = function() 
{
    if (window.event.wheelDelta > 0)
    {
        scroll(content, -10);
    }
    else
    if (window.event.wheelDelta < 0)
    {
        scroll(content, 10);
    }
}

// Workaround for focus lost problem
// See http://msdn.microsoft.com/en-us/library/ms723664(VS.85).aspx

var focusDuration = 10;
var focusTimer = window.setInterval(focusTimer, 50);
var vli = 0;  // array index at the top of the display pane


function focusTimer()
{
    window.focus();
    if ((focusDuration--) == 0)
    {
       window.clearInterval(focusTimer);
    }
}

// Loading

function flyoutLoad()
{
    var flyout = flyoutGetContext();
    
    if (!flyoutGetError())
    {
        flyoutCreateControls();

        switch (flyout)
        {
        case 'flyoutGuide':
            flyoutLoadGuide(flyoutGetProgramId());
            break;
        case 'flyoutRecordings':
            flyoutLoadRecordings();
            break;     
        case 'flyoutWildcards':
            flyoutLoadWildcards();
            break;
        case 'flyoutReady':
            flyoutLoadReady();
            break;
        }
    }
    else
    {
        flyoutShowError();
    }
}

function flyoutGetContext()
{
    return System.Gadget.document.parentWindow.theFlyout;
}

function flyoutGetError()
{
    return System.Gadget.document.parentWindow.theFlyoutError;
}

function flyoutGetProgramId()
{
    return System.Gadget.document.parentWindow.theFlyoutProgramId;
}

function flyoutCreateControls()
{
	createButton(
		navigateBack,
		function() { navigation.back() },
		'images/glyphs_left_rest.png', 
		'images/glyphs_left_hover.png', 
		'images/glyphs_left_pressed.png', 
		'images/glyphs_left_disabled.png');
	navigateBackLink.onclick = 
	    function() { navigation.back(); return false; }
	navigateBackLink.hideFocus = true;
	createButton(
		scrollUp,
		function() { scroll(content, -100) },
		'images/glyphs_up_rest.png', 
		'images/glyphs_up_hover.png', 
		'images/glyphs_up_pressed.png', 
		'images/glyphs_up_disabled.png');
	createButton(
		scrollDown, 
		function() { scroll(content, 100) },
		'images/glyphs_down_rest.png', 
		'images/glyphs_down_hover.png', 
		'images/glyphs_down_pressed.png', 
		'images/glyphs_down_disabled.png');
    
    flyoutUpdateControls();
}

function flyoutShowProgress()
{
    progress.style.display = 'block';
    progressIndicator.style.display = 'block';
}

function flyoutHideProgress()
{
//    progress.style.display = 'none';
//    progressIndicator.style.display = 'none';
}

function flyoutLoadGuide(programId)
{
	flyoutShowProgress();

    header.innerText = 'Ohjelmaopas';
    
	if (programId != -1)
	{
	    navigation.clear();
        flyoutUpdateControls();
	    service.getProgram(programId, getProgramComplete);
	}
	else
	{
	    navigation.clear();
	    navigation.push(function() { flyoutLoadGuide(-1) });
        flyoutUpdateControls();
	    service.getChannels(getChannelsComplete);
	}
}

function flyoutLoadRecordings()
{
	flyoutShowProgress();

	navigation.clear();
	navigation.push(function() { flyoutLoadRecordings() });
	flyoutUpdateControls();
	
    header.innerText = 'Tulevat tallenteet';
    
	service.getRecordingList(getRecordingsComplete);
}

function flyoutLoadWildcards()
{
	flyoutShowProgress();

	navigation.clear();
    navigation.push(function() { flyoutLoadWildcards() });
    flyoutUpdateControls();
    
    header.innerText = 'Aina tallentuvat';

    service.getWildcardList(getWildcardListComplete);
}

function flyoutLoadReady()
{
	//flyoutShowProgress();
	
	navigation.clear();
	navigation.push(function() { flyoutLoadReady() });
	//flyoutUpdateControls();
	
	//header.innerText = 'Tallennetut';

    service.getReadyList(null, getReadyListComplete);
}

function flyoutShowError()
{
	navigation.clear();

    footer.innerHTML = '';
    content.innerHTML = '<table class="Error"><tr><td><span>Käyttäjätiedot ovat puutteelliset</span><br/><br/>Sulje tämä ikkuna, klikkaa vimpaimen oikeassa yläkulmassa olevaa jakoavaimen kuvaa ja syötä Elisa Viihde tunnuksesi.<br/><br/><a href="#" onclick="flyoutClose()">Sulje</a></td></tr></table>';
}

function flyoutClose()
{
    System.Gadget.Flyout.show = false;
}

function flyoutClear()
{
	
//	content.scrollTop = 0;
//	while (content.childNodes.length > 0)
//		content.removeChild(content.childNodes[0]);
}

function flyoutUpdateControls()
{
	
//	
//    if (content.scrollHeight > content.offsetHeight)
//    {
//        
//        scrollUp.style.display = 
//            scrollDown.style.display = 'block';
//    }
//    else
//    {
//        scrollUp.style.display = 
//            scrollDown.style.display = 'none';
//    }
//    
//    if (navigation.top())
//    {
//        navigateBack.style.display = 
//            navigateBackLink.style.display = 'none';
//    }
//    else
//    {
//        navigateBack.style.display = 
//            navigateBackLink.style.display = 'block';
//    }
}

// Channel list

function getChannelsComplete(request)
{
	var response = service.parse(request);
	if (response == null)
		return;
		
	flyoutClear();
	
	var table = document.createElement('table');
	for (i = 0; i < response.channels.length; i++)
	{
		var channel = response.channels[i];
		var row, col;
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		var a = document.createElement('a');
		a.innerText = channel;
		a.href = 'javascript:void(0)';
		a.channel = channel;
		a.onclick = function() { channelClicked(this.channel); }
		a.setAttribute('className', 'channel');
		col.appendChild(a);
	}
	content.appendChild(table);
	
	flyoutUpdateControls();
	flyoutHideProgress();
}

function channelClicked(channel)
{
    flyoutShowProgress();

	navigation.push(function() { channelClicked(channel) });
	
	service.getPrograms(channel, getProgramsComplete);
}

// Program list

function getProgramsComplete(request)
{
	var response = service.parse(request);
	if (response == null)
		return;

    flyoutClear();

	var table = document.createElement('table');

	var lastDate = -1;
		
	for (i = 0; i < response.programs.length; i++)
	{
		var program = response.programs[i];
		var date = extractDate(program.start_time);
		var row, col;
		if (lastDate != date)
		{
			row = table.insertRow(-1);
			col = row.insertCell(-1);
			col.colSpan = 2;
			col.innerHTML = '<span class="programsTitle">' + response.channelname + ' - ' + getWeekdayName(date) + ' ' + date + '</span>';
		}
		lastDate = date;
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		col.innerText = program.simple_start_time;
		col = row.insertCell(-1);
		var a = document.createElement('a');
		a.innerText = service.convert(program.name);
		a.href = 'javascript:void(0)';
		a.programId = program.id
		a.onclick = function() { programClicked(this.programId); }
		if (program.recorded == "true")
		{
		    a.setAttribute('className', 'programsProgramRecorded');
		}
		else
		{
		    a.setAttribute('className', 'programsProgram');
		}
		col.appendChild(a);
	}
	content.appendChild(table);
	
	flyoutUpdateControls();
	flyoutHideProgress();
}

function programClicked(id)
{
    flyoutShowProgress();

	navigation.push(function() { programClicked(id) });

	service.getProgram(id, getProgramComplete);
}

// Program information

function getProgramComplete(request)
{
	var response = service.parse(request);
	if (response == null)
		return;

    flyoutClear();
	
	var table = document.createElement('table');
	var row, col;
	row = table.insertRow(-1);
	col = row.insertCell(-1);
	col.innerHTML = '<span class="programTitle">' + service.convert(response.name) + '</span>';
	row = table.insertRow(-1);
	col = row.insertCell(-1);
	col.innerHTML = '<span class="programChannel">' + service.convert(response.channel) + '</span>';
	row = table.insertRow(-1);
	col = row.insertCell(-1);
	col.innerHTML = '<span class="programShortText">' + service.convert(response.short_text) + '</span>';
	row = table.insertRow(-1);
	col = row.insertCell(-1);
	col.innerHTML = '<span class="programTime">' + "Aika: " + service.convert(response.start_time) + '</span>';
	row = table.insertRow(-1);
	col = row.insertCell(-1);
	col.innerHTML = '<span class="programDuration">' + "Kesto: " + service.convert(response.flength) + '</span>';
	
	var context = flyoutGetContext();
	
	if (context != 'flyoutReady')
	{
	    row = table.insertRow(-1);
        col = row.insertCell(-1);
	    if (response.recorded && response.recordingid != null)
	    {
	        if (response.is_wildcard)
	        {
	            var a = document.createElement('a');
	            a.innerText = 'Poista ajastus';
	            a.href = 'javascript:void(0)';
	            a.onclick = function() { removeRecordingClicked(response.id, response.recordingid); };
	            a.setAttribute('className', 'action');
	            col.appendChild(a);
	        }
	        else
	        {
	            var a = document.createElement('a');
	            a.innerText = 'Poista jatkuva tallennus';
	            a.href = 'javascript:void(0)';
	            a.onclick = function() { removeWildcardClicked(response.id, response.recordingid); };
	            a.setAttribute('className', 'action');
	            col.appendChild(a);
	        }
        }
        else
        {
	        var a = document.createElement('a');
            a.innerText = 'Tallenna tämä ohjelma';
            a.href = 'javascript:void(0)';
            a.onclick = function() { addRecordingClicked(response.id); }
            a.setAttribute('className', 'action');
            col.appendChild(a);
            
	        row = table.insertRow(-1);
            col = row.insertCell(-1);

	        var a = document.createElement('a');
            a.innerText = 'Tee jatkuva tallennus';
            a.href = 'javascript:void(0)';
            a.onclick = function() { addWildcardClicked(response.id, response.channel, response.name, ''); }
            a.setAttribute('className', 'action');
            col.appendChild(a);
        }	
	}
	
	if (context == 'flyoutReady')
	{
	    if (response.programviewid)
	    {
	        row = table.insertRow(-1);
            col = row.insertCell(-1);

	        a = document.createElement('a');
            a.innerText = 'Poista tallenne';
            a.href = 'javascript:void(0)';
            a.onclick = function() { removeReadyClicked(response.id, response.programviewid); }
	        a.setAttribute('className', 'action');
	        col.appendChild(a);
	    }
	}
	
	if (response.url)
	{
	    var vlcPath = vlcGetPath();
	    if (vlcPath != "")
	    {
	        row = table.insertRow(-1);
            col = row.insertCell(-1);

	        a = document.createElement('a');
            a.innerText = 'Katsele';
            a.href = 'javascript:void(0)';
            a.onclick = function() { viewRecordingClicked(vlcPath, response.url); }
	        a.setAttribute('className', 'action');
	        col.appendChild(a);
	    }
	}
	        
	content.appendChild(table);
	
	flyoutUpdateControls();
	flyoutHideProgress();
}

function addRecordingClicked(programId)
{
    flyoutShowProgress();

    service.addRecording(programId, function() { 
        service.getProgram(programId, getProgramComplete); });
}

function addWildcardClicked(programId, channel, wildcard, folderId)
{
    flyoutShowProgress();

    service.addWildcard(channel, wildcard, folderId, function() { 
        service.getProgram(programId, getProgramComplete); });
}

function removeRecordingClicked(programId, recordingId)
{
    flyoutShowProgress();

    service.removeRecording(recordingId, function() { 
        service.getProgram(programId, getProgramComplete); });
}

function removeWildcardClicked(programId, recordingId)
{
    flyoutShowProgress();

    service.removeWildcard(recordingId, function() { 
        service.getProgram(programId, getProgramComplete); });
}

function removeReadyClicked(programId, programViewId)
{
    flyoutShowProgress();

    service.removeReady(programViewId, function() { 
        service.getProgram(programId, getProgramComplete); });
}

function viewRecordingClicked(vlcPath, url)
{
    System.Shell.execute(vlcPath, url);
}

// Recordings list

function getRecordingsComplete(request)
{
	var response = service.parse(request);
	if (response == null)
		return;

    flyoutClear();
		
	var table = document.createElement('table');
	for (i = 0; i < response.recordings.length; i++)
	{
		var recording = response.recordings[i];
		var row, col;
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		var a = document.createElement('a');
		if (recording.wild_card == null)
		    a.innerText = service.convert(recording.name);
		else
		    a.innerText = service.convert(recording.name) + " *";
		a.href = 'javascript:void(0)';
		a.programId = recording.program_id;
		a.onclick = function() { programClicked(this.programId); };
		a.setAttribute('className', 'recording');
		col.appendChild(a);
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		col.innerHTML = '<span class="recordingsDescription">' + service.convert(recording.channel) + " " + service.convert(recording.start_time) + '</span>';
	}
	content.appendChild(table);
	
	flyoutUpdateControls();
	flyoutHideProgress();
}

// Wildcards list

function getWildcardListComplete(request)
{
	var response = service.parse(request);
	if (response == null)
		return;

    flyoutClear();
		
	var table = document.createElement('table');
	for (i = 0; i < response.wildcardrecordings.length; i++)
	{
		var recording = response.wildcardrecordings[i];
		var row, col;
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		var a = document.createElement('a');
		a.innerText = service.convert(recording.wild_card);
		a.href = 'javascript:void(0)';
		a.wildcardId = recording.recording_id;
		a.onclick = function() { wildcardClicked(this.wildcardId); }
		a.setAttribute('className', 'recording');
		col.appendChild(a);
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		col.innerHTML = '<span class="wildcardsDescription">' + service.convert(recording.wild_card_channel) + '</span>';
	}
		
	content.appendChild(table);
	
	flyoutUpdateControls();
	flyoutHideProgress();
}

function wildcardClicked(id)
{
    flyoutShowProgress();

	navigation.push(function() { wildcardClicked(id) });

	service.getWildcardList(getWildcardComplete, id);
}

// Wildcard information

function getWildcardComplete(request)
{
	var response = service.parse(request);
	if (response == null)
		return;

    var recording_id = request.callbackData;

    flyoutClear();
	
	var table = document.createElement('table');
	var row, col;
	
	for (i = 0; i < response.wildcardrecordings.length; i++)
	{
	    var recording = response.wildcardrecordings[i];
	    if (recording.recording_id == recording_id)
	    {
	        row = table.insertRow(-1);
	        col = row.insertCell(-1);
	        col.innerHTML = '<span class="wildcardTitle">' + service.convert(recording.wild_card) + '</span>';
	        row = table.insertRow(-1);
	        col = row.insertCell(-1);
	        col.innerHTML = '<span class="wildcardChannel">' + service.convert(recording.wild_card_channel) + '</span>';
	        row = table.insertRow(-1);
	        col = row.insertCell(-1);
	        col.innerHTML = '<span class="wildcardFolder">' + "Kansio: " + service.convert(recording.folder) + '</span>';
	        row = table.insertRow(-1);
	        col = row.insertCell(-1);
	        col.innerHTML = '<span class="wildcardAdded">' + "Lisätty: " + service.convert(recording.added) + '</span>';
	        row = table.insertRow(-1);
	        col = row.insertCell(-1);
	        var a = document.createElement('a');
            a.innerText = 'Poista ajastus';
            a.href = 'javascript:void(0)';
            a.wildcardId = recording_id;
            a.onclick = function() { removeWildcardClicked(this.wildcardId); }
	        a.setAttribute('className', 'action');
	        col.appendChild(a);
	    }
	}
	
	content.appendChild(table);
	
	flyoutUpdateControls();
	flyoutHideProgress();
}

function removeWildcardClicked(wildcardId)
{
    flyoutShowProgress();

    service.removeWildcard(wildcardId, function() { 
        service.getWildcardList(getWildcardListComplete); });
}

// Ready list ///////////////////////////
/////////////////////////////////////////

videoItemRows = 14; // now many recordings visible at the time
videoItems = new Array();


function createVideoListTable() {
	
//	create table for videolist

	var table = document.getElementById("vlt");
	var cell;

	for (var i = 0; i < videoItemRows; i++) {
		cell = table.insertRow(-1).insertCell(-1);
		cell.appendChild(document.createTextNode("adddd"));
	}
}


function getReadyListComplete(request) {

	vli = 0;
	var response = service.parse(request);
	if (response == null)
		return;

	// create array of recordings (readys)
	
	var inx = 0;
	var folders = response.ready_data[0].folders;
	var link;
	
	for (var i = 0; i < folders.length; i++)
		
	{
		var folder = folders[i];
		
		var a = document.createElement('a');
		a.innerText = service.convert(folder.name);
		a.href = 'javascript:void(0)';
		a.folderId = folder.id;
		a.onclick = function() { folderClicked(this.folderId); }
		a.setAttribute('className', 'readyFolder');
		videoItems[inx++] = "<a href='javascript:void(0)' onclick='folderClicked(" + folder.id + ")'>" + service.convert(folder.name) + "</a>" ;
		//videoItems[inx++] = a;
	}

	var recordings = response.ready_data[0].recordings;
	for (i = 0; i < recordings.length; i++)
	{
		var recording = recordings[i];
		var a = document.createElement('a');
		if (recording.wild_card == null)
		    a.innerText = service.convert(recording.name);
		else
		    a.innerText = service.convert(recording.name) + " *";
		a.href = 'javascript:void(0)';
		a.programId = recording.program_id;
		a.onclick = function() { recordingClicked(this.programId); }
		a.setAttribute('className', 'readyProgram');
		videoItems[inx++] = "i=" + i;
		//row = table.insertRow(-1);
		//col = row.insertCell(-1);
		//col.innerHTML = service.convert(recording.channel) + " " + service.convert(recording.start_time);
	}

	populateVideoList();
	
}


function populateVideoList() {
	
	var table = document.getElementById("vlt");
	var tableb = table.getElementsByTagName("tbody")[0];
	var cell, row;
	
	for (var i = vli; i < videoItemRows; i++) {
		row = tableb.getElementsByTagName("tr")[i];
		cell = row.getElementsByTagName("td")[0];

		if (i < videoItems.length) {
//			//row.replaceChild(videoItems[i], cell);
//			if (!cell.hasChildNodes()) {
//				cell.appendChild(videoItems[i]);
//			} else {
//				row.removeChild(cell);
//				cell.appendChild(videoItems[i]);
////				row.replaceChild(videoItems[i], cell);
//			}
			cell.innerHTML = videoItems[i];
		} else {
			//row.removeChild(cell); 
			cell.innerHTML = "&nbsp;";
		} 
	} 
}

function getReadyListCompleteXX(request)
{
	var response = service.parse(request);
	if (response == null)
		return;

    //flyoutClear();
		
	var table = document.getElementById("vlt");
	
	var folders = response.ready_data[0].folders;
	for (i = 0; i < folders.length; i++)
//		for (i = 0; i < nrOfreadys; i++)
	{
		var folder = folders[i];
		var row, col;
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		var a = document.createElement('a');
		a.innerText = service.convert(folder.name);
		a.href = 'javascript:void(0)';
		a.folderId = folder.id;
		a.onclick = function() { folderClicked(this.folderId); }
		a.setAttribute('className', 'readyFolder');
		col.appendChild(a);
	}

	var recordings = response.ready_data[0].recordings;
	for (i = 0; i < recordings.length; i++)
	{
		var recording = recordings[i];
		var row, col;
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		var a = document.createElement('a');
		if (recording.wild_card == null)
		    a.innerText = service.convert(recording.name);
		else
		    a.innerText = service.convert(recording.name) + " *";
		a.href = 'javascript:void(0)';
		a.programId = recording.program_id;
		a.onclick = function() { recordingClicked(this.programId); }
		a.setAttribute('className', 'readyProgram');
		col.appendChild(a);
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		col.innerHTML = service.convert(recording.channel) + " " + service.convert(recording.start_time);
	}
	
	//content.appendChild(table);
	
	flyoutUpdateControls();
	flyoutHideProgress();
}

function folderClicked(folderId)
{
    //flyoutShowProgress();

    navigation.push(function() { folderClicked(folderId) });
    
    service.getReadyList(folderId, getReadyListComplete);
}

function recordingClicked(programId)
{
    //flyoutShowProgress();

	navigation.push(function() { recordingClicked(programId) });

	service.getProgram(programId, getProgramComplete);
}
