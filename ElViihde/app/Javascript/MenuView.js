var MenuView = {
	foo: 1,
	bar: 2,
	foobar : function () {
		ElViihde.debug("foo" + foo);
	}
}

MenuView.init = function () {
	var foobar = 3;
	ElViihde.debug("MenuView init");
	MenuView.enableKeys();
}

MenuView.enableKeys = function() {
    document.getElementById("anchor").focus();
}

MenuView.keyDown = function () {
	
	var keyCode = event.keyCode;
	ElViihde.debug("Key pressed: " + keyCode);
}

