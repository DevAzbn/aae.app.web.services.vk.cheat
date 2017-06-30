'use strict';

var azbn = new require(__dirname + '/../../../../../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module, '/../../../');

var _data = azbn.mdl('process/child').parseCliData(process.argv);

//console.log(_data);

process.send({
	kill_child : 1,
	app_fork : 1,
	data : _data,
	config : app.loadJSON('../config/main'),
})