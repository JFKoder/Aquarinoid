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
    }
    ngOnDestroy() {
      this.socketService.disconnect();
    }
}
