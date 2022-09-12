import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../websocket.service';
import { KeysPipe } from '../../keys.pipe';
@Component({
  selector: 'app-pin-test',
  templateUrl: './pin-test.component.html',
  styleUrls: ['./pin-test.component.scss']
})
export class PinTestComponent implements OnInit {
  public Board: any;
  public sensor = {
    pin: [
      { name: '', pin: 0, status: 0 },
    ],
    board: '',
    humidity1: 0
  }
  public sensor2:any;


  constructor(    private socketService: WebsocketService) { 

  }

  ngOnInit(): void {
    this.socketService.socket.on('sensorData', socketSensorData => {
      console.dir('Sensordata push'+this.socketService.sensorData['aquarinoid_344HwG'])
     this.sensor = socketSensorData
    })
   this.socketService.socket.emit('listSensors', {});
   console.dir("Sensordata ")
    

  }
  sendDown(pin:Number){
     this.socketService.socket.emit('TestPin', {"pin": pin, "modus": 0});
  }
  sendUp(pin:Number){
     this.socketService.socket.emit('TestPin', {"pin": pin, "modus": 1});
  }

} 
interface MyType {
    [key: string]: string | number;
}