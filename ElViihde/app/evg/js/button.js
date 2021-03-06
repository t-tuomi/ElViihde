function createButton(element, clickedHandler, imageMouseRest, imageMouseHover, imageMousePressed, imageMouseDisabled)
{
	var button = new Object();

	button.imageMouseRest = imageMouseRest;
	button.imageMouseHover = imageMouseHover;
	button.imageMousePressed = imageMousePressed;
	button.imageMouseDisabled = imageMouseDisabled;
	button.enabled = true;
	button.clickedHandler = clickedHandler;
	button.enable = function(enable) { buttonEnable(button, enable); }
	
	button.element = element;
	element.onmouseover = function() { buttonMouseOver(button); };
	element.onmouseout = function() { buttonMouseOut(button); };
	element.onmousedown = function() { buttonMouseDown(button); };
	element.onmouseup = function() { buttonMouseUp(button); };
	element.src = imageMouseRest;

	return button;
}

function buttonMouseOver(button)
{
	if (button.enabled)
		button.element.src = button.imageMouseHover;
	else
		button.element.src = button.imageMouseDisabled;
}

function buttonMouseOut(button)
{
	if (button.enabled)
		button.element.src = button.imageMouseRest;
	else
		button.element.src = button.imageMouseDisabled;
}

function buttonMouseDown(button)
{
	if (button.enabled)
		button.element.src = button.imageMousePressed;
	else
		button.element.src = button.imageMouseDisabled;
}

function buttonMouseUp(button)
{
	if (button.enabled)
	{
		button.element.src = button.imageMouseRest;
		button.clickedHandler(button);
	}
	else
		button.element.src = button.imageMouseDisabled;
}

function buttonEnable(button, enable)
{
	button.enabled = enable;
	if (enable)
	{
		button.element.src = button.imageMouseRest;
	}
	else 
	{
		button.element.src = button.imageMouseDisabled;
	}
}
