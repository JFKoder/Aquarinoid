import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../websocket.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditpinsComponent } from '../editpins/editpins.component';

@Component({
  selector: 'app-edit-controller',
  templateUrl: './edit-controller.component.html',
  styleUrls: ['./edit-controller.component.scss']
})
export class EditControllerComponent implements OnInit {

  public Board: any;
  public boardData: any = {};
  constructor(
    private socketService: WebsocketService,
    public dialog: MatDialog
    ) {
          
  }
  
  addPin(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(EditpinsComponent, dialogConfig);
    this.boardData.pins.push({id: this.boardData.pins.length, name: "name", number: "", type: false, onload: false }) 
    dialogRef.componentInstance.Pins = this.boardData.pins[this.boardData.pins.length -1]
  }

  openPinDialog(pinId:String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(EditpinsComponent, dialogConfig);
    for(let i=0; i< this.boardData.pins.length;i++){
      if(this.boardData.pins[i].id == pinId){
        dialogRef.componentInstance.Pins = this.boardData.pins[i]
        dialogRef.componentInstance.pinId = pinId;
      }
    }

  }

  ngOnInit(): void {

    /*
        let configBoardUpdate = {
      command: "writeConfig",
      board:     {
      "name": "ESP8266 - 1XYXY ABC",
      "ip": "192.168.0.16",
      "pass": "",
      "status": true,
      "pins": [
        {
          "name": "Pumpe 1XYXY 123",
          "number": "7",
          "type": "in",
          "onload": "off"
        },
        {
          "name": "Analog In",
          "number": "1",
          "type": "in",
          "onload": "off"
        }
      ]
    }
    }
    */
    let configBoardUpdate = {
      command: "getBoard",
      board: this.Board     
    }
    this.socketService.socket.emit('config', configBoardUpdate);
    this.socketService.socket.on('boardInfo', (boardData:any) => {
      this.boardData = boardData;
    })
  }

  public saveBoard(): void {
    this.socketService.socket.emit('config', {
      command: "writeConfig",
      board: this.boardData
    });
    console.dir(this.boardData)
  }
}
