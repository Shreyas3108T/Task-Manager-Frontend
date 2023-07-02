import { Component, OnInit} from '@angular/core';
import { Task } from 'src/app/Task';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  Token:any = localStorage.getItem("accessToken");
  TaskList:Task[] = [];
  TaskListEmpty:boolean;
  TaskMsg:string;
  router:Router;


  constructor(router:Router){
    this.TaskListEmpty = false;
    this.TaskMsg = ""
    this.router = router;
  }

  ngOnInit(): void {
    this.ValidateLogin()
    const URL = `http://localhost:8081/v1/assignedTask`;
    const headers = {
      "Authorization":`Bearer ${this.Token}`
      }
      axios.get(URL,{headers}).then(response=>{
        this.TaskList = response.data.data
        if(this.TaskList.length === 0){
            this.TaskListEmpty = true
            this.TaskMsg ="No Tasks Have been assigned to you"
        }
        else{
          this.TaskListEmpty = false
          this.TaskMsg =""
        }
      }).catch(error=>{
        console.log(error)
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
