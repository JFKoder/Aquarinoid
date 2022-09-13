'use strict';
require('dotenv').config()

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

/*
const server = require('https').createServer({
  key: fs.readFileSync('./Server/certs/gmsvienb444.local.key'),
  cert: fs.readFileSync('./Server/certs/gmsvienb444.local.cert')
},app);
*/
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
  socket.on('event_name', (msg) => {
    console.log('Haha😀: ' + msg);
  });
  socket.on('config', (msg) => {
    switch (msg.command) {
      case 'listBoards':
        console.log("listBoards")
        socket.emit('listBoards', config.config.controller)
        break;
      case 'getBoard':
        console.log("getBoard")
        config.config.controller.forEach(board =>{
          if(board.name == msg.board) socket.emit('boardInfo', board)
        })     
        break;
      case 'delteBoard':
        let found_board =false;
        console.log("delete Board")
        for(let i = 0; i< config.config.controller.length; i++) {
          if(config.config.controller[i].name == msg.board){
            found_board = true;
            config.config.controller.splice(i,1)
            console.log("Delete: "+msg.board.name)
            config.saveConfig();
            io.emit('listBoards', config.config.controller)
            return;
          }
        };
        if(!found_board) socket.emit('err', "Board not found")
        break;
      case 'writeConfig':
        console.log("writeConfig")
        let found =false;
        for(let i = 0; i< config.config.controller.length; i++) {
          if(config.config.controller[i].name == msg.board.name){
            found = true;
            config.config.controller[i] = msg.board
            console.log("Found: "+msg.board.name)
            i = config.config.controller.length;
          }
        };
        if(!found) config.config.controller.push(msg.board)

        console.dir(msg.board)
        io.emit('listBoards', config.config.controller)
        io.emit('config', "{Saved}")
        config.saveConfig();
        break;
    
      default:
        io.emit('err', "Nothing to do")
        console.log("none")
        break;
    }
    
    console.log('message: ' + msg);
  });
});



server.listen(process.env.PORT);

