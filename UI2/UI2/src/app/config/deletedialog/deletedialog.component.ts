import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../websocket.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {

  public Board:any;
  constructor(
    private socketService: WebsocketService,
    public dialog: MatDialog
    ) {  } 

    ngOnInit(): void {
    }

    public delte(){
      this.socketService.socket.emit('config', {command: "delteBoard", board: this.Board });
    }

}
