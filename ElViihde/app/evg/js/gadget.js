var theFlyout;
var theFlyoutError;
var theFlyoutProgramId;

// Mouse wheel support

//window.onmousewheel = document.onmousewheel = function() 
//{
//    if (window.event.wheelDelta > 0)
//    {
//        scroll(content, -10);
//    }
//    else
//    if (window.event.wheelDelta < 0)
//    {
//        scroll(content, 10);
//    }
//}

function gadgetLoad()
{
	service.logout();

	System.Gadget.settingsUI = "settings.html";
	System.Gadget.Flyout.onHide = gadgetOnHideFlyout;
    System.Gadget.onDock = gadgetOnDock;
    System.Gadget.onUndock = gadgetOnUndock;
    System.Gadget.onSettingsClosed = gadgetOnSettingsClosed;
    
    gadgetCreateControls();
    gadgetRefresh();
}

function gadgetToggleBackground(button, hover)
{
    if (gadgetGetButton(theFlyout) == button)
    {
        if (hover)
	        button.src = "images/gadget-button-pressed-hover.png";
        else
	        button.src = "images/gadget-button-pressed.png";
    }
    else
    {
        if (hover)
	        button.src = "images/gadget-button-hover.png";
        else
	        button.src = "images/gadget-button.png";
    }
}

function gadgetUpdateButtons()
{
    imgButton0.src = "images/gadget-button.png";
    imgButton1.src = "images/gadget-button.png";
    imgButton2.src = "images/gadget-button.png";
    imgButton3.src = "images/gadget-button.png";
    
    var button = gadgetGetButton(theFlyout);
    if (button != null)
    {
        button.src = "images/gadget-button-pressed-hover.png";
    }
}

var refreshDuration = 15 * 60 * 1000; // 15 minutes
var refreshInterval;

function gadgetRefresh()
{
    if (gadgetHasSettings())
    {
        header.style.display = 
            footer.style.display = 'block';
        gadgetLoadTopList();
    }
    else
    {
        header.style.display = 
            footer.style.display = 'none';
        gadgetShowError();
        gadgetUpdateButtons();
    }

    if (refreshInterval)
    {
        window.clearInterval(refreshInterval);
        refreshTimer = undefined;
    }    
    refreshInterval = window.setInterval(gadgetRefresh, refreshDuration);
}

function gadgetShowError()
{
    content.innerHTML = '<table class="Error"><tr><td><span>Käyttäjätiedot ovat puutteelliset</span></td></tr><tr><td>Klikkaa vimpaimen oikeassa yläkulmassa olevaa jakoavaimen kuvaa ja syötä Elisa Viihde tunnuksesi.</td></tr></table>';
}

function gadgetShowFlyout(flyout, img, programId)
{
    theFlyout = flyout;
    theFlyoutError = !gadgetHasSettings();
	theFlyoutProgramId = programId;
	
	if (!System.Gadget.Flyout.show)
	{
	    System.Gadget.Flyout.file = "flyout.html";
	    System.Gadget.Flyout.show = true;
	}
	else
	{
	    System.Gadget.Flyout.file = "flyout.html";
	}
	
	gadgetUpdateButtons();
}

function gadgetOnHideFlyout()
{
    theFlyout = "";

    gadgetUpdateButtons();    
}

function gadgetOnDock()
{
    gadgetBody.style.width = 128;
    gadgetBody.style.height = 180;
    imgBackground.src = "url(images/gadget-background.png)";
}

function gadgetOnUndock()
{
    gadgetBody.style.width = 258;
    gadgetBody.style.height = 180;
    imgBackground.src = "images/gadget-background-undocked.png";
    gadgetRefresh();
}

function gadgetOnSettingsClosed()
{
    gadgetRefresh();
}

function gadgetGetButton(flyout)
{
    switch (flyout)
    {
    case 'flyoutGuide':
        return imgButton0;
    case 'flyoutRecordings':
        return imgButton1;
    case 'flyoutWildcards':
        return imgButton2;
    case 'flyoutReady':
        return imgButton3;
    default:
        return null;
    }
}

function gadgetHasSettings()
{
    var username = System.Gadget.Settings.readString("username");
    var password = System.Gadget.Settings.readString("password");
    
    return (username != "" && password != "");
}

function gadgetCreateControls()
{
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
}

function gadgetUpdateControls()
{
    if (content.scrollHeight > content.offsetHeight)
    {
        
        scrollUp.style.display = 
            scrollDown.style.display = 'block';
    }
    else
    {
        scrollUp.style.display = 
            scrollDown.style.display = 'none';
    }
}

function gadgetClear()
{
	content.scrollTop = 0;
	while (content.childNodes.length > 0)
		content.removeChild(content.childNodes[0]);
}

function gadgetLoadTopList()
{
	service.getTopList(getTopListComplete);
}

function getTopListComplete(request)
{
	var response = service.parse(request);
	if (response == null)
		return;

    gadgetClear();

	header.innerText = 'Suosituimmat';
		
	var table = document.createElement('table');
	for (i = 0; i < response.programs.length; i++)
	{
		var program = response.programs[i];
		var row, col;
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		var a = document.createElement('a');
		a.innerText = (i + 1) + ". " + service.convert(program.name);
		a.href = 'javascript:void(0)';
		a.programId = program.program_id;
		a.onclick = function() { programClicked(this.programId); };
		a.setAttribute('className', 'program');
		col.appendChild(a);
		row = table.insertRow(-1);
		col = row.insertCell(-1);
		col.innerHTML = '<span class="programDescription">' + service.convert(program.channel) + " " + service.convert(program.start_time) + '</span>';
	}
	content.appendChild(table);
	
	gadgetUpdateControls();
}

function programClicked(programId)
{
   gadgetShowFlyout("flyoutGuide", imgButton0, programId);
}
