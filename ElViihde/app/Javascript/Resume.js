
var Resume = {

		pos : 0,
		fs : null,
		file : null,
		data : null,
		
		init : function() {
			this.fs = new FileSystem();
			if (!(this.file = this.fs.openCommonFile('elviihde.data', 'r+'))) {
				this.file = this.fs.openCommonFile('elviihde.data', 'w+');
			}
			this.data = {};
			this.readFile();
			this.dumpData();
		},
		
		closeFile : function () {
			this.fs.closeCommonFile(this.file);
		},
		
		dumpData : function() {
			for (var p in this.data) {
				alert(p + ": " + this.data[p]);
			}
		},
				
		readFile : function() {
			this.data = JSON.parse(this.file.readAll());
		},
		
		writeFile : function() {
			this.dumpData();
			this.file.writeAll(JSON.stringify(this.data));
		},
		
		resetFile : function() {
			var o = new Object();
			this.fs.closeCommonFile(this.file);
			this.file = this.fs.openCommonFile('elviihde.data', 'w+');
			o = ({"151" : 151});
			this.file.writeAll(JSON.stringify(o));
			this.fs.closeCommonFile(this.file);
			this.file = this.fs.openCommonFile('elviihde.data', 'r+');

		},
		
		loadResumePoint : function(pid) {
			
			if (this.data.hasOwnProperty(pid)) {
				this.pos = this.data[pid];
			} else {
				this.pos = 0;
			}
		},
		
		storeResumePoint : function(pid, time) {
			alert("Pid: " + pid);
			this.data[pid] = Math.floor(time / 1000);
		},
		
		getResumePoint : function() {
			return this.pos;
		}
		
};