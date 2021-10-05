import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private socketService: WebsocketService) {}
  
  ngOnInit() {
    this.socketService.setupSocketConnection();
  }
ngOnDestroy() {
  this.socketService.disconnect();
}
loadData(){
  
}


  
  

}
