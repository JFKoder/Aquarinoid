'use strict';
const path = require('path')
const compression = require("compression")
let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const cors = require('cors')
const _app_folder = 'UI/dist/AquarinoidUI';
const axios = require('axios')
const { authJwt } = require("./middleware");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

let dbcon;
let config;
let io;
let boco;
let sensorStatus = []
let pumActive = false;
let automaticOn = true;
app.use(bodyParser.json());
app.use(cors())
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
app.setDbCon = function(setDbCon){
  dbcon = setDbCon;
}
app.setSensorStatus= function(id, sensors){
  let exist = false;
  for(let i = 0;i< sensorStatus.length;i++){
    if(sensorStatus[i].id == id ) {
      sensorStatus[i].data = sensors;
      sensorStatus[i].time = Date.now()
      exist = true;
    }
  }
  if(!exist) sensorStatus.push({'id': id, 'data': sensors, 'time': Date.now()})
}
app.removeSensor= function(id){
   for(let i = 0;i< sensorStatus.length;i++){
      if(sensorStatus[i].id == id ) sensorStatus[i].splice(i,1);
   }
}
app.getSensor = function(name){
  for(let i = 0;i< sensorStatus.length;i++){
    if( sensorStatus[i].data.board == name ) return sensorStatus[i];
  }
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
app.get('/api/getconfig', [authJwt.verifyToken],function(req,res){
  return res.json( config );
}) 
app.post('/api/setconfig', [authJwt.verifyToken],function(req,res){
  io.emit('config', "{1234}")
  return res.json( {done: true} );
}) 

// Boardcontroller
app.post('/api/signin', function(req,res){
  if(req.body.password== '' && req.body.username==''){
    var token = jwt.sign({ id: 13 }, '12345', {
      expiresIn: 86400 // 24 hours
    });

    return res.json( {
      id: 13,
      username: 'test',
      email: 'test@yo',
      roles: [],
      accessToken: token
    } );
  }else{
    return res.status(400).json( {
      id: 'no access'
    } );
  }

}) 
app.get('/api/getactivboard', [authJwt.verifyToken],function(req,res){
  return res.json( boco.listActive() );
}) 
app.get('/api/gethumidity', [authJwt.verifyToken], function(req,res){
  let type=-1;
  let sql = "SELECT date , FLOOR(AVG(value)) as value FROM sensorData WHERE DATE(date) > (NOW() - INTERVAL 3 DAY)  GROUP BY   month(date), day(date), hour(date)"
  switch(req.query.type){
    case '0':
      sql = "SELECT date , FLOOR(AVG(value)) as value FROM sensorData WHERE DATE(date) > (NOW() - INTERVAL 24 HOUR)  GROUP BY  hour(date)"
      break;
    case '1':
      break;
    case '2':
      sql = "SELECT date , FLOOR(AVG(value)) as value FROM sensorData WHERE DATE(date) > (NOW() - INTERVAL 7 DAY)  GROUP BY   month(date), day(date), hour(date)"
      break;
    case '3':
      sql = "SELECT date , FLOOR(AVG(value)) as value FROM sensorData GROUP BY   month(date), day(date), hour(date)"
      break;
   }
 // let sql = "SELECT date , FLOOR(AVG(value)) value FROM sensorData WHERE DATE(date) > (NOW() - INTERVAL 3 DAY) GROUP BY day(date), hour(date) "
 // let sql = "SELECT date , FLOOR(AVG(value)) as value FROM sensorData WHERE DATE(date) > (NOW() - INTERVAL 3 DAY)  GROUP BY   month(date), day(date), hour(date)"
  dbcon.query(sql, function (err, result, fields) {
    if (err) throw err;
    return res.json( 
      result
     );
  });
}) 
app.get('/api/getlog',[authJwt.verifyToken], function(req,res){
  dbcon.query("SELECT date , log FROM log ORDER BY date DESC", function (err, result, fields) {
    if (err) throw err;
    return res.json( 
      result
     );
  });
}) 

app.get('/api/getweather', [authJwt.verifyToken],function(req,res){
  dbcon.query("SELECT date, dataSet  FROM weather2 ", function (w_err, w_result, w_fields) {
    if (w_err) throw w_err;
      dbcon.query("SELECT date , FLOOR(AVG(value)) value FROM sensorData GROUP BY day(date), hour(date)", function (err, result, fields) {
        if (err) throw err;
        
      });
  });
}) 
app.get('/api/dashgraph', [authJwt.verifyToken],function(req,res){

  dbcon.query("SELECT date, dataSet  FROM weather2 ", function (err, result, fields) {
    if (err) throw err;
    return res.json( 
      result
     );
  });
}) 
app.get('/api/sensorstatus',[authJwt.verifyToken],function(req,res){  
  console.dir(sensorStatus)
  let resp=sensorStatus;
  res.json(app.getSensor('aquarinoid_344HwG') )
})
app.get('/api/automatic',[authJwt.verifyToken],function(req,res){
  
  res.json({'autostart':automaticOn})
})
app.post('/api/automatic',[authJwt.verifyToken],function(req,res){
  console.dir(req.body);
  switch (req.body.set) {
    case 'off':
      console.log("set AUTOSTART Off")
      automaticOn = false;
      break;
    case 'on': 
      automaticOn = true;
      console.log("set AUTOSTART On")
      break;
  }
  
  res.json({'autostart':automaticOn})
})
app.get('/api/testautomatic',[authJwt.verifyToken],function(req,res){
  automatic();
  res.json({'ok':1})
})
app.get('/api/testauth',[authJwt.verifyToken],function(req,res){
  
  res.json({'ok':1})
})
app.get('/api/test', [authJwt.verifyToken],function(req,res){
  let resp = boco.Boards[0].request()
  return res.json( resp );
}) 
app.get('/api/weather', [authJwt.verifyToken],function(req,res){
  getWeather()
  return res.json({
    answer: 42
  });
}) 
app.get('/test', [authJwt.verifyToken],function(req, res) {

  let message = req.body.message;
  console.log('Regular GET message: ', message);
  return res.json({

    answer: 42
  });
});

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
function automatic(){
  /*
  let log = "test automatic";
  let sql = "INSERT INTO log (log) VALUES ( '"+log+"')";
  dbcon.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
*/
  let low_limit = 350;
  let up_limit = 330;
  let sensor = app.getSensor('aquarinoid_344HwG')
  let sensorHum = sensor.data.humidity1;
  let pumpStatus = -1;
  sensor.data.pin.forEach(element => {
    if(element.name == 'airPump3') pumpStatus = element.status;
  });
  //einschalten
  if(!pumActive && sensorHum > low_limit && pumpStatus == 0 &&automaticOn){
    let log = "Set PIN 0 to 1 ";
    io.emit('setPin', {"pin": 0, "status": 1})
    pumActive = true;
    
      let sql = "INSERT INTO log (log) VALUES ( '"+log+"')";
      dbcon.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
      console.log(log)
  }
  if(pumActive  && pumpStatus == 0){
    pumActive= false
  }
  //ausschalten

  if(pumActive && sensorHum < up_limit && pumpStatus == 1 &&automaticOn){
    let log = "Set PIN 0 to 0 "
    io.emit('setPin', {"pin": 0, "status": 0})
    pumActive = false;

    let sql = "INSERT INTO log (log) VALUES ('"+log+"')";
    dbcon.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    console.log(log)
  }  
}
setInterval(function(){
  //automatic()
},180000)
/*
class dashgraph{
  public lable = [];
  public humidity [];
  public weather;

  //Find lable and return it, or add new one
  public findLable(lableId){
    for(let i =0;i<this.lable.length;i++){
      if(this.lable[i].lableId == lableId){
        return this.lable[i];
      }
    }
    let humData1 = {
      value=[];
    }
    let weatherData = {
      humidity;
      temp;
      temp_min;
      temp_max;
      winspeed;
      cloud;
    }

    return {"lableId": lableId,  "humData1": humData1, "weatherData": weatherData}
  }
  public addHumidity1(humData,date){
    let formDat = new Date(date);
    this.findLable(formDat.getDay()+"."+ formDat.getMonth()+". "+ formDat.getHours()+":00").humData1.push(humData)
  }
}
let lable = {
  lableId;
  month;
  day;
  hour;
  minute;

  humidity1;
  weather;

}
let humData1 = {
  lableId;
  value;
}
let weatherData = {
  humidity;
  temp;
  temp_min;
  temp_max;
  winspeed;
  cloud;
}
*/
module.exports = app;