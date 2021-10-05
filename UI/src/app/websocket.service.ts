import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 socket!: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor() { }

  setupSocketConnection() {
    this.socket = io('http://localhost:8081');    
   // this.socket.emit('my message', 'Hello there from Angular.');
  }

  disconnect() {
      if (this.socket) {
          this.socket.disconnect();
      }
  }


}
