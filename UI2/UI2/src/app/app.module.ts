import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NgChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
 import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import { MatInputModule } from '@angular/material/input';
import { EditControllerComponent } from './config/edit-controller/edit-controller.component';

 import {MatSelectModule} from '@angular/material/select'; 

import { WebsocketService } from './websocket.service';
import { ConfigComponent } from './config/config.component';
import { EditpinsComponent } from './config/editpins/editpins.component';
import { PinTestComponent } from './config/pin-test/pin-test.component';
import { DeletedialogComponent } from './config/deletedialog/deletedialog.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { LogComponent } from './dashboard/log/log.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helper/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    DeletedialogComponent,
    EditpinsComponent,
    PinTestComponent,
    ConfigComponent,
    EditControllerComponent,
    LogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgChartsModule,
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
    MatSelectModule,
  ],
  providers: [WebsocketService,authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
