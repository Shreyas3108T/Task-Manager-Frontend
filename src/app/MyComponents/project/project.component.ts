import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from "axios";
import { Project } from 'src/app/Project';
import { Task, TaskPriority, TaskStatus } from 'src/app/Task';
import { User } from 'src/app/User';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  Token:any= localStorage.getItem("accessToken")
  id:string = "";
  tasks:Task[] = [];
  title:string ="";
  description:string="";
  dueDate:Date=new Date();
  priority:TaskPriority =TaskPriority.LOW; 
  assignedUser:Number = 0;
  status:TaskStatus = TaskStatus.CREATED;
  projectId:string = "";
  taskStatus = TaskStatus;
  taskPriorityKeys: string[] = [];
  selectedOption:string = "Select a Value"
  selectedUser:number =0;
  Priority:string = "Priority";
  currentUser:User = new User(0,"","");

  datetoday:Date = new Date()

  errorStatus:boolean;
  errorStatus2:boolean;
  error:string;
  error2:string;
  router:Router;
  
 


  userlist:User[]=[];

  ProjectInfo:Project = new Project("","",0,[]);

  assignedTo:Number = 0;

  constructor(private route:ActivatedRoute,router:Router){
    this.taskPriorityKeys = Object.keys(TaskPriority);
    this.errorStatus = false
    this.errorStatus2= false
    this.error = ""
    this.error2=""
    this.router = router;
  }
  
  ngOnInit(): void {
    this.ValidateLogin();
      this.route.params.subscribe(params=>{
        this.id = params['id']
      })
      //api to get project data from project id 
      const URL = `http://localhost:8081/v1/Task?ProjectId=${this.id}`
      const headers = {
        "Authorization":`Bearer ${this.Token}`
        }
      axios.get(URL,{headers}).then(response =>{
        this.tasks = response.data.data
        this.tasks.sort((a:Task,b:Task)=> a.dueDate>b.dueDate?1:-1);
      }).catch(error=>{
        console.log(error)
      })

      const URL2 = `http://localhost:8081/v1/project/${this.id}`
      axios.get(URL2,{headers}).then(response=>{
        this.ProjectInfo = response.data.data
        console.log(response.data.data)
      }).catch(error=>{
        console.log(error)
      })

      const URL3 = `http://localhost:8081/v1/user`
      axios.get(URL3,{headers}).then(response=>{
        this.userlist = response.data.data
      }).catch(error=>{
        console.log(error);
      })
      const URL4 = `http://localhost:8081/v1/currentUserInfo`
      axios.get(URL4,{headers}).then(response=>{
        this.currentUser = response.data.data
      }).catch(error=>{
        console.log(error);
      })

  }

  async onSubmit():Promise<void>{
    const URL = "http://localhost:8081/v1/Task"
    const headers = {
      "Authorization":`Bearer ${this.Token}`
      }
      const body = {
        title:this.title,
        description:this.description,
        dueDate:this.dueDate,
        priority:this.selectedOption,
        projectId:this.id
      }
      try{
      const response = await axios.post(URL,body,{headers})
      console.log(response)
      this.refreshPage()
      }
      catch(error:any){
        console.log(error)
        this.errorStatus = true;
        this.error = "error Creating";
        setTimeout(()=>{
        this.errorStatus = false;
        this.error =""
      },5000)
      }
  }

  AddUser():void{
    const URL3 = `http://localhost:8081/v1/AddToProject`
    const headers = {
      "Authorization":`Bearer ${this.Token}`
      }
    console.log(this.selectedUser)
    const Body ={
      id:this.selectedUser,
      ProjectId:this.id
    }
    console.log("=============",Body)
      axios.post(URL3,Body,{headers}).then(response=>{
        console.log(response.data.data)
        this.refreshPage()
      }).catch(error=>{
        console.log(error.response.data.message);
        this.errorStatus2 = true;
        this.error2 = error.response.data.message;
        setTimeout(()=>{
        this.errorStatus2 = false;
        this.error2 =""
      },5000)
      })
  }

  refreshPage() {
    window.location.reload();
  }

  nameFromId(id:number):any{
    return this.userlist.find((user:User)=>user.id === id)?.name;
  }

  ValidateLogin(){
    const ValidateURL = `http://localhost:8081/v1/validateToken`
    const headers = {
      "Authorization":`Bearer ${this.Token}`
      }
    axios.get(ValidateURL,{headers}).then(response=>{
      
    }).catch(error=>{
      this.router.navigate(["/login"]);
    })
  }
  
}
