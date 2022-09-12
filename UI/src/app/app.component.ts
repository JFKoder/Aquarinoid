import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AquarinoidUI';
    constructor(
    private socketService: WebsocketService
  ) {}
    ngOnInit() {
        this.socketService.setupSocketConnection();
        this.socketService.socket.on('info', listBoards => {
          this.socketService.socket.emit('WebApp',{type: "WebApp"})
          
          console.dir("Show to server i am the WebApp: ")
        })
        
    }
    ngOnDestroy() {
      this.socketService.disconnect();
    }
}
