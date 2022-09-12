import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-editpins',
  templateUrl: './editpins.component.html',
  styleUrls: ['./editpins.component.scss']
})
export class EditpinsComponent implements OnInit {
public Pins:any;
public pinId:any;

  constructor(
     private socketService: WebsocketService

  ) { }

  ngOnInit(): void {
    console.dir(this.Pins)
  }
  public saveBoard(): void {

  }
}
