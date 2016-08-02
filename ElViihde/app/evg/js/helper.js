function extractDate(text)
{
	return text.substr(0, text.indexOf(' '));
}

function getWeekdayName(text)
{
	var fields = text.split('.');
	var date = new Date(fields[2], fields[1] - 1, fields[0]);
	var day = date.getDay();
	switch (day)
	{
	case 0: return 'Su';
	case 1: return 'Ma';
	case 2: return 'Ti';
	case 3: return 'Ke';
	case 4: return 'To';
	case 5: return 'Pe';
	case 6: return 'La';
	}
	return '';
}

function scroll(element, amount)
{
	var scroller = new Object();

	scroller.element = element;
	scroller.direction = (amount >= 0 ? 1 : -1);
	scroller.left = amount * scroller.direction;
	scroller.step = 5;
	scroller.wait = 15;

	scroller.scroll = function()
	{
		if (scroller.left != 0)
		{
			var next = (scroller.left > scroller.step ? scroller.step : scroller.left);
			scroller.left -= next;
			scroller.element.scrollTop += (scroller.direction * next);
			setTimeout(scroller.scroll, scroller.wait);
		}
	}
	scroller.scroll();
	
	return scroller;
}
