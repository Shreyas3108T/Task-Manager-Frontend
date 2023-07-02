import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './MyComponents/loginform/loginform.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { ProjectsComponent } from './MyComponents/projects/projects.component';
import { TasksComponent } from './MyComponents/tasks/tasks.component';
import { TaskComponent } from './MyComponents/task/task.component';
import { ProjectComponent } from './MyComponents/project/project.component';
import { SignUpComponent } from './MyComponents/sign-up/sign-up.component';

const routes: Routes = [
  {path:'', redirectTo:'Projects',pathMatch:'full'},
  {path:'signup', component:SignUpComponent},
  { path: 'login', component: LoginformComponent },
  // {path: 'home', component:ProjectsComponent},
  {path:'Projects',component:ProjectsComponent},
  {path:'Projects/:id',component:ProjectComponent},
  {path:'Tasks',component:TasksComponent},
  {path: 'Tasks/:id',component:TaskComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
