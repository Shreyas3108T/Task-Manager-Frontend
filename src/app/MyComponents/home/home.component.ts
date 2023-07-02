import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  Token:any;
  private router: Router;
 
  constructor(router:Router){
  this.Token = localStorage.getItem("accessToken");
  this.router = router;
  if(this.Token.length>0){
     //api that gives user Data from token 
  }
  else{
    this.router.navigate(["/login"]);
  }
 }
}
