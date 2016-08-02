navigation =
{
	push: function(cb)
	{
	    this.list[this.list.length] = cb;
	},
	
	back: function()
	{
	    if (this.list.length > 0)
	    {
		    var cb = this.list.pop();
		    if (this.list.length > 0)
		    {
			    cb = this.list.pop();
			    cb();
		    }
	    }
	},
	
	clear: function()
	{
	    this.list = new Array();
	},

    top: function()
    {
        return (this.list.length <= 1);
    },
	
	list: new Array()
};