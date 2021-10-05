import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { HttpClient } from '@angular/common/http';

import { ApiService } from '../api.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditControllerComponent } from './edit-controller/edit-controller.component';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {

  constructor(
    private apiservice: ApiService,
    private socketService: WebsocketService,
    private http: HttpClient,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.showConfig();
  }

  showConfig() {
 
  }
  
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(EditControllerComponent, dialogConfig);
  }
}

