import { Component,Input, OnInit } from '@angular/core';
import { Task,TaskPriority,TaskStatus} from 'src/app/Task';
import axios from "axios";
import { Project } from 'src/app/Project';
import { User } from 'src/app/User';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
 @Input() task:Task = new Task("","","",new Date(),TaskPriority.LOW,0,TaskStatus.CREATED,"");
 @Input() projectName:string = "";
 taskStatus = TaskStatus;
taskPriority = TaskPriority;
Token:any = localStorage.getItem("accessToken");
project:Project = new Project("","",0,[]);
users:User[]=[];
selectedUser:number = 0;
currentUser:User = new User(0,"","");

  taskStatusKeys: string[] = [];
  selectedOption: String = "";

 constructor(){
  this.taskStatusKeys = Object.keys(TaskStatus);
  this.selectedOption = this.task.status;
 }

 ngOnInit(): void {
     const URL = `http://localhost:8081/v1/project/${this.task.projectId}`
     const headers = {
      "Authorization":`Bearer ${this.Token}`
      }
      axios.get(URL,{headers}).then(response=>{
        this.project = response.data.data
      })

      const URL2 = `http://localhost:8081/v1/user`
      axios.get(URL2,{headers}).then(response=>{
        this.users = response.data.data
      })
      const URL4 = `http://localhost:8081/v1/currentUserInfo`
      axios.get(URL4,{headers}).then(response=>{
        this.currentUser = response.data.data
      }).catch(error=>{
        console.log(error);
      })
 }

 dateToWord(date: Date): string {
  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const Ddate:Date = new Date(date)
  const day: number = Ddate.getDate();
  const month: number = Ddate.getMonth();
  const year: number = Ddate.getFullYear();

  const monthWord: string = months[month];

  return `${monthWord} ${day}, ${year}`;
}

compareWithCurrentDate(otherDate: Date): boolean {
  const currentDate = new Date(); // Current date and time
  const comapareDate = new Date(otherDate)
  // Set the time portion of both dates to 00:00:00 to compare only the dates
  const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const otherDateOnly = new Date(comapareDate.getFullYear(), comapareDate.getMonth(), comapareDate.getDate());
  
  if (currentDateOnly < otherDateOnly) {
    
    return true; // Current date is before otherDate
  } else {
    
    return false; // Current date is equal to or after otherDate
  }
}
updateTaskStatus(status:String):void{
  this.selectedOption= status;
  console.log(status)
  //api to udpate it in the 
}
updateAssigedUser(id:any):void{
    const URL = `http://localhost:8081/v1/assignTask`
    const headers = {
      "Authorization":`Bearer ${this.Token}`
      }
      const Body = {
        TaskId:this.task.id,
        UserId:id
      }
    axios.post(URL,Body,{headers}).then(Response=>{
      this.refreshPage()
    }).catch(error=>{
      console.log(error)
    })
  
}

 usernameFromId(id: any): string {
  return this.users.find((user:User)=>user.id === id)?.name || "Empty"

}

refreshPage() {
  window.location.reload();
}

HandleClick():void{
  console.log(this.task.id,this.selectedOption)

  const URL = `http://localhost:8081/v1/TaskStatusUpdate`
    const headers = {
      "Authorization":`Bearer ${this.Token}`
      }
      const Body = {
        TaskId:this.task.id,
        Status:this.selectedOption
      }
    axios.post(URL,Body,{headers}).then(Response=>{
      this.refreshPage()
    }).catch(error=>{
      console.log(error)
    })
}

DeleteTask(id:string):void{
  const URL = `http://localhost:8081/v1/Task/${id}`;
  const headers = {
    "Authorization":`Bearer ${this.Token}`
    }
  axios.delete(URL,{headers}).then(response=>{
    this.refreshPage()
  }).catch(error=>{
    console.log(error)
  })
}

}
//delete api for project and task