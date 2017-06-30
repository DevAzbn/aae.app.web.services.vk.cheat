'use strict';

var azbn = new require(__dirname + '/../../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist').argv;

azbn.setMdl('config', require('./config/main'));

azbn.mdl('config').interval.fork = argv.interval_fork || azbn.mdl('config').interval.fork || 1000;

setInterval(function() {
	
	var forks = app.loadJSON('forks');
	
	if(forks.items) {
		
		for(var uid in forks.items) {
			(function(item){
				
				if(item.status == 1 && (item.lastact + item.period) < azbn.now()) {
					
					app.fork(item.path, item.data, function(_process, _msg){
						
						if(_msg.kill_child == 1) {
							
							_process.kill();
							
							forks.items[uid].lastact = azbn.now();
							
							app.saveJSON('forks', forks);
							
							app.log.info('Выполнено:', item.title);
							
						}
						
					});
					
				}
				
			})(forks.items[uid]);
		}
		
	}
	
}, azbn.mdl('config').interval.fork);