import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { WebsocketService } from './websocket.service';
import { ConfigComponent } from './config/config.component';
import { SetupComponent } from './setup/setup.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { EditControllerComponent } from './config/edit-controller/edit-controller.component';
import { MatButtonModule } from '@angular/material/button';
 import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { SchedulesComponent } from './schedules/schedules.component';
import { TasksComponent } from './tasks/tasks.component';
import { DeletedialogComponent } from './config/deletedialog/deletedialog.component';
import { EditpinsComponent } from './config/editpins/editpins.component';
import { PinTestComponent } from './config/pin-test/pin-test.component';
import { KeysPipe } from './keys.pipe';

import { VisualComponent } from './dashboard/visual/visual.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    ConfigComponent,
    SetupComponent,
    EditControllerComponent,
    SchedulesComponent,
    TasksComponent,
    DeletedialogComponent,
    EditpinsComponent,
    PinTestComponent,
    KeysPipe,
    VisualComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule ,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatSlideToggleModule,

  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
