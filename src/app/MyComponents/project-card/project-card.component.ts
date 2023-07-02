import { Component,Input, OnInit } from '@angular/core';
import axios from 'axios';
import { Project } from 'src/app/Project';
import { User } from 'src/app/User';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit{
  @Input() Token:String = "";
  Projects:Project[]=[];
  Users:User[]=[];
  ProjectsPartOf:Project[]=[];

  constructor(){ }
  ngOnInit(): void {
    const URL1 = 'http://localhost:8081/v1/project'
    const headers = {
      "Authorization":`Bearer ${this.Token}`
  }
  axios.get(URL1,{headers}).then(response=>{
    
    this.Projects = response.data.data;

  }).catch((error)=>{
    console.log(error)
  })
  const URL2 = "http://localhost:8081/v1/user"
  axios.get(URL2,{headers}).then(response=>{
    
      this.Users =response.data.data;

  }).catch(error=>{
    console.log(error);
  })

  const URL3 = "http://localhost:8081/v1/projectPartOf";
  axios.get(URL3,{headers}).then(response=>{
    
    this.ProjectsPartOf = response.data.data;
  }).catch(error=>{
    console.log(error);
  })

  }


  UserName(id:number):string {
    const name = this.Users.find((user:User)=> user.id ===id )?.email;
    if(typeof name ==='string'){
      return name;
    }
    return "NA";
  }


}
