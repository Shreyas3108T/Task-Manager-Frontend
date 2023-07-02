import { Component } from '@angular/core';
import axios from 'axios';
import {Router} from "@angular/router"
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {
  Email:string;
  Password:String;
  private router: Router;
  errorStatus:Boolean;
  error:string;
  myForm: FormGroup;

  constructor(router:Router){
    this.Email = ""
    this.Password = ""
    this.errorStatus = false
    this.error = ""
    this.router = router;

    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required)
    });
  }

  async onSubmit(): Promise<void>{
    if(this.Email.length ==0 || this.Password.length ==0){
      this.errorStatus = true
      this.error="missing fields"
      setTimeout(()=>{
        this.error = ""
        this.errorStatus = false;
      },5000)
      return ;
    }
    const URL = 'http://localhost:8081/v1/login'
    const Body = {
      email:this.Email,
      password:this.Password
    }
    try{
      const response = await axios.post(URL,Body);
      localStorage.setItem("accessToken",response.data.data.Token);
      this.router.navigate(["/"]);
    }
    catch(error:any){
      this.errorStatus = true;
      this.error = error.response.data.message;
    }
    finally{
      setTimeout(()=>{
        this.error = ""
        this.errorStatus = false;
      },5000)
    }


  }

  refreshPage() {
    window.location.reload();
  }
}
