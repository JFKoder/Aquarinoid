import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
  public sensor = {
    pin: [
      { name: '', pin: 0, status: 0 },
    ],
    board: '',
    humidity1: 0
  }

 public sensorData:any = [];
  constructor() {
    this.sensorData[this.sensor.board] = this.sensor;
   }

  setupSocketConnection() {
    this.socket = io('https://10.8.0.6');    

   // this.socket.emit('my message', 'Hello there from Angular.');
  }

  disconnect() {
      if (this.socket) {
          this.socket.disconnect();
      }
  }


}
