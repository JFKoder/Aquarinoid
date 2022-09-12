import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component'
import { WebsocketService } from './websocket.service';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
 title = 'AquarinoidUI';
    constructor(
    private socketService: WebsocketService,private tokenStorageService: TokenStorageService
  ) {}
    ngOnInit() {
      let token = this.tokenStorageService.getToken();
      if(token != null )   this.socketService.setupSocketConnection(token);
        this.socketService.socket.on('info', (listBoards:any) => {
          this.socketService.socket.emit('WebApp',{type: "WebApp"})
          
          console.dir("Show to server i am the WebApp: ")
        })
          this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
    }
    ngOnDestroy() {
      this.socketService.disconnect();
    }
}
