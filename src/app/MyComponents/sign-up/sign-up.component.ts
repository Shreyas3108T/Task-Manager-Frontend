import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  name:string = ""
  Email:string = ""
  Password:string = ""
  errorStatus:boolean = false;
  error:string = ""
  private router: Router;

  constructor(router:Router){
    this.router = router;
  }

  onSubmit(){
    if(this.name.length ===0 || this.Email.length === 0 || this.Password.length === 0){
      this.errorStatus = true;
      this.error= "field missing"
      return;
    }
    const URL = `http://localhost:8081/v1/signup`
    const Body = {
      name:this.name,
      email:this.Email,
      password:this.Password
    }

    axios.post(URL,Body).then(response=>{
      localStorage.setItem("accessToken",response.data.data.Token);
      this.router.navigate(["/"]);
    }).catch(error=>{
      console.log(error);
    })
  }
}
