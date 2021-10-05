'use strict';
const fs = require('fs');
const conf = require('./config/config')
const BC = require('./boardcontroller/BoardController')
let config = new conf();
/*
let config = JSON.parse(fs.readFileSync('./Server/config.json'));
function saveConfig(){
  let data = JSON.stringify(config, null, 2);
  fs.writeFile('./Server/student2.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}
*/

let boco = new BC(config);
boco.load(config)
//boco.loadfromConfig(config.controller)

let app = require('./http-server');
app.setConfig( config );
app.setBoCo(boco);
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,  {
  cors: {
    origin: '*',
  }});

app.setIO(io);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('config', (msg) => {
    switch (msg) {
      case value:
        
        break;
    
      default:
        break;
    }
    io.emit('config', "{1234}")
    config.saveConfig();
    console.log('message: ' + msg);
  });
});


server.listen(8081);

