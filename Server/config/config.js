'use strict';
const fs = require('fs');

module.exports = function () {
	this.config = JSON.parse(fs.readFileSync('./Server/config.json'));

	this.saveConfig = function(){
	let data = JSON.stringify(this.config, null, 2);
	fs.writeFile('./Server/config.json', data, (err) => {
			if (err) throw err;
			console.log('Data config to file');
		}); 
	}
}
