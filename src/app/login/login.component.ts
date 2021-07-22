import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  wrongLogin:boolean = false;
  showSpinner = false;

  constructor(private _loginService: LoginService, private router:Router) {
  }
    

  onSubmit(form: NgForm) {
    var username = form.value.username;
    var password = form.value.password; 
    this.showSpinner = true;
    this._loginService.Login(username+password).subscribe(data => {
    this.wrongLogin = !data;
    this.showSpinner = false;
    if (data == true) {
      localStorage.setItem("l", "1");
      this.router.navigate(['/settings']);
    } else {
      localStorage.removeItem("l");
      this.router.navigate(['/login']);
    }});
  }

}
