import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private router:Router;
  Home:boolean;
  Project:boolean;
  Tasks:boolean;
  Token:any = localStorage.getItem("accessToken");
  login:boolean;
  signup:boolean;

  constructor(router:Router){

    this.router =router;
    const currentPage = this.router.url
    this.Home = true;
    this.Project = true;
    this.Tasks = true;
    this.login = true;
    this.signup = true;

  }
  ngOnInit(): void {
      // const URL = `http://localhost:8081/v1/validateToken`
      // const headers = {
      //   "Authorization":`Bearer ${this.Token}`
      // }
      // axios.get(URL,{headers}).then(Response=>{
      //   this.login = true;
      // }).catch(error=>{
      //   this.login = false;
      // })
  }


  HandleLogOut(){
    localStorage.setItem("accessToken","")
    this.router.navigate(["/login"])
  }
  refreshPage() {
    window.location.reload();
  }
}
