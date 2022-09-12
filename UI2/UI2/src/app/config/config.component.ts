import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { HttpClient } from '@angular/common/http';

import { ApiService } from '../api.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditControllerComponent } from './edit-controller/edit-controller.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component'
import { PinTestComponent } from './pin-test/pin-test.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {
  public _dataSource: any[] = [];
  constructor(
    private apiservice: ApiService,
    private socketService: WebsocketService,
    private http: HttpClient,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.socketService.socket.on('listBoards', (listBoards:any) => {
      this._dataSource = listBoards;
      console.dir("Recieved BoardList: "+listBoards)
    })
    this.showConfig();
    this.socketService.socket.emit('config', {command: "listBoards"});
    console.log("asked Boards")

  }

  showConfig() {
 
  }
  openDeleteDialog(boardName:String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;  
    let dialogRef = this.dialog.open(DeletedialogComponent , dialogConfig);
    dialogRef.componentInstance.Board = boardName
  }

  openDialog(boardName:String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(EditControllerComponent, dialogConfig);
    dialogRef.componentInstance.Board = boardName
  }
  openPinTest(boardName:String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(PinTestComponent, dialogConfig);
    dialogRef.componentInstance.Board = boardName
  }
}


