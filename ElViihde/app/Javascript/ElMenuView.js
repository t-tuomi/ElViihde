var ElMenuView = {

		cursorPos : 0,
		itemArrayIndex : 0,
		itemArray : [],
		maxCurPos : 0,	
		table : null,

		init : function (xhttp) {
			
			this.xhttp = xhttp;
			folder = eval( '(' + this.xhttp.responseText + ')' );	
			
			//console.log(xhttp);
			console.log(folder);
			//console.log(folder.ready_data[0].folders[1].name);
			
			this.itemArray = folder.ready_data[0].folders.concat(folder.ready_data[0].recordings);
			this.maxCurPos = nrOfTableRows > this.itemArray.length - 1 ? this.itemArray.lenght - 1 : nrOfTableRows;
			this.table = document.getElementById("vlt");
			console.log("maxcurpos: " + this.maxCurPos);
			console.log("table: " + this.table);
			this.drawMenu();
		},
			
		keyDown : function () {
				console.log("key down");
		    	
		    	console.log(this.cursorPos + " -- " + this.maxCurPos + " -- " + this.itemArrayIndex);
		    	this.table.rows[this.cursorPos].cells[0].style.backgroundColor = "black";
		    	if (this.cursorPos < this.maxCurPos - 1) {
		    		console.log("joo on");
		    		this.cursorPos++;
		    		this.itemArrayIndex++;
		    	} else {
		    		if (this.itemArrayIndex < this.itemArray.length - 1) {
		    			this.itemArrayIndex++;
		    			this.drawMenu(); 
		    		}
		    	}
		    	
		    	this.table.rows[this.cursorPos].cells[0].style.backgroundColor = "grey";
		    	
			},
			
		keyUp :	function() {
				console.log("key up");
		   
		    	console.log(this.cursorPos + " -- " + this.maxCurPos + " -- " + this.itemArrayIndex);
		    	this.table.rows[this.cursorPos].cells[0].style.backgroundColor = "black";
		    	if (this.cursorPos > 0) {
		    		console.log("joo on > 0");
		    		this.cursorPos--;
		    		this.itemArrayIndex--;
		    	} else {
		    		if (this.itemArrayIndex > 0) {
		    			this.itemArrayIndex--;
		    			this.drawMenu(); 
		    		}
		    	}
		    	this.table.rows[this.cursorPos].cells[0].style.backgroundColor = "grey";  	
			},
			
			
			
		drawMenu : function() {
				//var table = document.getElementById("vlt");
				//table.rows[2].cells[0].innerHTML = "foooff";
				var i;
				console.log("elCurrentView:");
				console.log(this);
				//for (i = elCurrentView.itemArrayIndex - elCurrentView.cursorPos; i < elCurrentView.itemArrayIndex + nrOfTableRows; i++) {
				for (i = 0; i < nrOfTableRows; i++) {
					//if (i + this.itemArrayIndex < this.itemArray.length - this.cursorPos) {
						this.table.rows[i].cells[0].innerHTML = this.itemArray[i + this.itemArrayIndex - this.cursorPos].name;
					//} else {
					//	this.table.rows[i].cells[0].innerHTML = "tyhjää";
					//}
					//console.log(table.rows[i].cells[0].innerHTML);
				}
				this.table.rows[this.cursorPos].cells[0].style.backgroundColor = "grey";

			}
};

