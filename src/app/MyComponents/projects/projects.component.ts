import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Project } from 'src/app/Project';
import { User } from 'src/app/User';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  Token:any = localStorage.getItem("accessToken");
  Projects:Project[]=[];
  Users:User[]=[];
  ProjectsPartOf:Project[]=[];
  name:string ="";
  test:any=[];
  errorStatus:boolean;
  error:string;

  NoProjectsPartof:boolean;
  NoProjectPartofMsg:string;

  NoProjects:boolean;
  NoProjectMsg:string;
  router:Router;
  
  constructor(router:Router){

    this.errorStatus = false
    this.error = ""
    this.NoProjectPartofMsg="";
    this.NoProjectsPartof = false;
    this.NoProjectMsg ="";
    this.NoProjects=false;
    this.router = router;

  }

  ngOnInit(): void{
      this.ValidateLogin();
    const URL1 = 'http://localhost:8081/v1/project'
    const headers = {
      "Authorization":`Bearer ${this.Token}`
  }
  axios.get(URL1,{headers}).then(response=>{
    
    this.Projects = response.data.data;
    if(this.Projects.length === 0){
      this.NoProjects= true;
      this.NoProjectMsg = "You have not created any project yet"
    }else{
      this.NoProjects=  false;
      this.NoProjectMsg = ""
    }
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
    if(this.ProjectsPartOf.length === 0){
      this.NoProjectsPartof= true;
      this.NoProjectPartofMsg = "You are part of No project yet"
    }else{
      this.NoProjectsPartof=  false;
      this.NoProjectPartofMsg = ""
    }
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

  async onSubmit():Promise<void>{
    const URL = "http://localhost:8081/v1/project"
    const headers = {
      "Authorization":`Bearer ${this.Token}`
    }
    const Body = {
      name:this.name
    };
    try{
      const response = await axios.post(URL,Body,{headers});
      this.refreshPage();
    }
    catch(error:any){
      console.log(error);
      this.errorStatus = true;
      this.error = "error Creating";
      setTimeout(()=>{
        this.errorStatus = false;
        this.error =""
      },5000)
    }

  }
  refreshPage() {
    window.location.reload();
  }

  DeleteProject(id:string){
    const URL = `http://localhost:8081/v1/project/${id}`;
    const headers = {
      "Authorization":`Bearer ${this.Token}`
    }
    axios.delete(URL,{headers}).then(response=>{
        this.refreshPage();
    }).catch(error=>{
      console.log(error)
      this.errorStatus = true;
      this.error = "error deleting";
      setTimeout(()=>{
        this.errorStatus = false;
        this.error =""
      },5000)
    })
  }

  ValidateLogin(){
    const ValidateURL = `http://localhost:8081/v1/validateToken`
    const headers = {
      "Authorization":`Bearer ${this.Token}`
      }
      console.log(headers)
    axios.get(ValidateURL,{headers}).then(response=>{
      console.log(this.Token,response.data.data)
    }).catch(error=>{
      console.log(error)
      this.router.navigate(["/login"]);
    })
  }
}
