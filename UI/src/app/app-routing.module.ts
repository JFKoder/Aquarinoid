import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigComponent } from './config/config.component';
import { SetupComponent } from './setup/setup.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'tasks', component: TasksComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
