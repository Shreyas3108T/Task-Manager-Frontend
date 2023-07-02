import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginformComponent } from './MyComponents/loginform/loginform.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './MyComponents/home/home.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { ProjectCardComponent } from './MyComponents/project-card/project-card.component';
import { TasksCardComponent } from './MyComponents/tasks-card/tasks-card.component';
import { TaskItemComponent } from './MyComponents/task-item/task-item.component';
import { ProjectsComponent } from './MyComponents/projects/projects.component';
import { TasksComponent } from './MyComponents/tasks/tasks.component';
import { ProjectComponent } from './MyComponents/project/project.component';
import { TaskComponent } from './MyComponents/task/task.component';
import { SignUpComponent } from './MyComponents/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    HomeComponent,
    NavbarComponent,
    ProjectCardComponent,
    TasksCardComponent,
    TaskItemComponent,
    ProjectsComponent,
    TasksComponent,
    ProjectComponent,
    TaskComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
