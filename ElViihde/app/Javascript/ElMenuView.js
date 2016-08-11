var ElMenuView = {

		cursorPos : 0,
		itemArrayIndex : 0,
		itemArray : [],
		maxCurPos : 0,	
		table : null,
		description : null,
		
		init : function (xhttp) {
			
			this.xhttp = xhttp;
			this.cursorPos = 0;
			this.itemArrayIndex = 0;
			var folder = eval( '(' + this.xhttp.responseText + ')' );	
			var url, i;
			
			for (i = 0; i < folder.ready_data[0].recordings.length; i++) {
				url = elBaseURL + "program.sl?programid=" +
					folder.ready_data[0].recordings[i].program_id +
					"&ajax=true";
				elLoadUrl(url, function() {
					folder.ready_data[0].recordings[this.cdata].program_info = 
						eval( '(' + this.xhttp.responseText + ')' );
				}, i);
			}
			console.log("FOLDER=");
			console.log(folder);
			this.itemArray = folder.ready_data[0].folders.concat(folder.ready_data[0].recordings);
			console.log("ITEMARRAY=");
			console.log(this.itemArray);
			this.maxCurPos = nrOfTableRows > this.itemArray.length - 1 ? this.itemArray.length - 1 : nrOfTableRows;
			this.table = document.getElementById("vlt");
			this.description = document.getElementById("description");
			this.drawMenu();
		},
			
		keyDown : function () {
				
				this.resetCursorBg();
		    	if (this.cursorPos < this.maxCurPos) {
		    		this.cursorPos++;
		    		this.itemArrayIndex++;
		    	} else {
		    		if (this.itemArrayIndex < this.itemArray.length - 1) {
		    			this.itemArrayIndex++;
		    			this.drawMenu(); 
		    		}
		    	}
		    	this.setCursorBg();
		    	this.showDescription();
		    	
			},
			
		keyUp :	function() {
		    	this.resetCursorBg();
		    	if (this.cursorPos > 0) {
		    		//console.log("joo on > 0");
		    		this.cursorPos--;
		    		this.itemArrayIndex--;
		    	} else {
		    		if (this.itemArrayIndex > 0) {
		    			this.itemArrayIndex--;
		    			this.drawMenu(); 
		    		}
		    	}
		    	this.setCursorBg();  	
		    	this.showDescription();
			},
			
			
		showDescription : function () {
			if (!this.isFolder()) {
				description.innerHTML = 
					decodeURIComponent(this.itemArray[this.itemArrayIndex].program_info.short_text);
			} else {
				description.innerHTML = "Tallenteita: " + 
					this.itemArray[this.itemArrayIndex].recordings_count;
			}
		},
		
		isFolder : function () {
			if (this.itemArray[this.itemArrayIndex].hasOwnProperty("program_info")) {
				return false;
			} else {
				return true;
			}
		},
			
		setCursorBg : function() {
			this.table.rows[this.cursorPos].cells[0].style.backgroundColor = "grey";
		},
		
		resetCursorBg: function() {
			this.table.rows[this.cursorPos].cells[0].style.backgroundColor = "black";
		},
		
		drawMenu : function() {

			var i;
			for (i = 0; i <= nrOfTableRows; i++) {
				if (i + this.itemArrayIndex - this.cursorPos < this.itemArray.length) {
						this.table.rows[i].cells[0].innerHTML = 
							decodeURIComponent(this.itemArray[i + this.itemArrayIndex - 
							                                  this.cursorPos].name);
					} else {
						this.table.rows[i].cells[0].innerHTML = "";
					}
					//console.log(table.rows[i].cells[0].innerHTML);
				}
				this.setCursorBg();
				this.showDescription();
			},
			
		
		clearMenu : function() {
			
			var i;
			
			for (i = 0; i < nrOfTableRows; i++) 
				this.table.rows[i].cells[0].innerHTML = "";
		}
};

