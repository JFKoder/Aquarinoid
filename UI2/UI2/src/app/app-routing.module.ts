import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigComponent } from './config/config.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent},
  { path: 'config', component: ConfigComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
