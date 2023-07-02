import { Component, OnInit,Input } from '@angular/core';
import axios from "axios";
import { Project } from 'src/app/Project';
import { Task,TaskStatus,TaskPriority } from 'src/app/Task';


@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.css']
})
export class TasksCardComponent implements OnInit {
  @Input() Token:String = "";
  tasks:Task[] = [];
  Projects:Project[]= [];
  ProjectsPartOf:Project[] = [];
  taskStatus = TaskStatus;
  taskPriority = TaskPriority;

  constructor(){
    
  }

  ngOnInit(): void {
    const URL1 = "http://localhost:8081/v1/assignedTask"
    const headers = {
      "Authorization":`Bearer ${this.Token}`
    }
    axios.get(URL1,{headers}).then(response=>{
      this.tasks = response.data.data;
    }).catch(error=>{
      console.log(error);
    })

    const URL2 = 'http://localhost:8081/v1/project'
  axios.get(URL2,{headers}).then(response=>{
   
    this.Projects = response.data.data;

  }).catch((error)=>{
    console.log(error)
  })
  const URL3 = "http://localhost:8081/v1/projectPartOf";
  axios.get(URL3,{headers}).then(response=>{
    
    this.ProjectsPartOf = response.data.data;
  }).catch(error=>{
    console.log(error);
  })

  }

  ProjectName(id:string):string{
    const name = this.Projects.find((project:Project)=>project.id === id)?.name;
    if(typeof name === 'string'){
      return name;
    }
    const pname = this.ProjectsPartOf.find((project:Project)=>project.id === id)?.name
    if(typeof pname === 'string'){
      return pname;
    }
    return "NA";
  }

  
}
