import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private _loginService: LoginService) {
  }
    

  onSubmit(form: NgForm) {
    console.log(form.value);
    var username = form.value.username;
    var password = form.value.password; 
    this._loginService.Login(username+password);
  }

}
