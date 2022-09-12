import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 socket!:any
  public sensor = {
    pin: [
      { name: '', pin: 0, status: 0 },
    ],
    board: '',
    humidity1: 0
  }

  public sensorData:any = [];
  
  constructor(private tokenStorage: TokenStorageService ) {
    this.sensorData[this.sensor.board] = this.sensor;
   }

  setupSocketConnection(token: string) {
    this.socket = io('https://192.168.0.222',{
      auth:{
        token: token
      }
    });    

   // this.socket.emit('my message', 'Hello there from Angular.');
  }

  disconnect() {
      if (this.socket) {
          this.socket.disconnect();
      }
  }


}
