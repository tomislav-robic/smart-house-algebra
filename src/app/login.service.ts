import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})

export class LoginService {
  private_url: string = "http://localhost:8080/api/login?credentials=";
  //private_url: string = "https://smart-house-api.herokuapp.com/api/login?credentials=";
  loggedIn: boolean = false;

  constructor(private http: HttpClient, private router:Router) { 
  }

  Login(credentials:string) {
    var url = this.private_url + credentials;
    this.http.get<boolean>(url, {
      headers: new HttpHeaders ({
        'Access-Control-Allow-Origin' : 'http://localhost:8080',
        'Content-Type': 'application/json'
      })}).subscribe(data => {
      this.loggedIn = data;
      if (data == true) {
        localStorage.setItem("l", "1");
        this.router.navigate(['/settings']);
      } else {
        localStorage.removeItem("l");
      }})
  }
}
