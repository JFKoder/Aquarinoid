'use strict';
const path = require('path')
const compression = require("compression")
let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

const _app_folder = 'UI/dist/AquarinoidUI';
const port = 8081;

let config;
let io;
let boco;
app.use(bodyParser.json());
app.use(compression());
// Let's create the regular HTTP request and response
app.setConfig = function(c){
  config = c;
}
app.setIO = function(ios){
  io =ios
}
app.setBoCo = function(bc){
  
  boco = bc;
}

/*
app.get('/', function(req, res) {

  console.log('Get index');
  fs.createReadStream('./index.html')
  .pipe(res);
});
*/



app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));
//Config
app.get('/api/getconfig', function(req,res){
  return res.json( config );
}) 
app.post('/api/setconfig', function(req,res){
  io.emit('config', "{1234}")
  return res.json( {done: true} );
}) 


// Boardcontroller
app.get('/api/getactivboard', function(req,res){
  return res.json( boco.listActive() );
}) 
app.get('/api/test', function(req,res){
  let resp = boco.Boards[0].request()
  return res.json( resp );
}) 

app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
    return;
});



app.post('/', function(req, res) {

  let message = req.body.message;
  console.log('Regular POST message: ', message);
  return res.json({

    answer: 42
  });
});

module.exports = app;