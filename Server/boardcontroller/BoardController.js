const Board = require('./Board')

module.exports = function(){
	this.sensors = [];
	
	this.putSensorData = function(id,data){
		this.sensors[id] = data
	}
	this.getSensorData = function(){
		return this.sensors;
	}
	this.load = function(setup){
		//console.log("Add "+ JSON.stringify(setup.config.controller))
		for(let board in setup.config.controller){
			if(setup.config.controller[board].status){
				this.addBoard(setup.config.controller[board])
			}
			//console.log("Add "+ JSON.stringify(setup.config.controller[board]))
		}
	}
	//Array of all Boards
	this.Boards = []

	//add a Board (load)
	this.addBoard = function(setup){
		this.Boards.push(new Board(setup))
	}
	//add from Config
	/*
	this.loadfromConfig = function(controller){
		console.log("Add "+ controller)
		for(let board in setup.controller){
			this.addBoard(board)	
		}
	}
	*/
	// List active
	this.listActive = function (){
		let active = [];
		for(let act in this.Boards){
			if(act.status) active.push(act.name)
		}
		return active;
	}



}