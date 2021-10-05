var http = require('http');


module.exports = function(setup){
	this.name = setup.name;
	this.ip = setup.ip;
	this.pass = setup.pass;
	this.status = setup.status;

	this.options = {
		hostname: this.ip,
		port: 80,
		path: '/LED=ON',
		method: 'GET'
	};	

	this.request = function(){
		req = http.request(this.options, function(res) {
			console.log(res.statusCode);
			res.on('data', function(d) {
				process.stdout.write(d);
			});
		});

		req.end()
	}
}