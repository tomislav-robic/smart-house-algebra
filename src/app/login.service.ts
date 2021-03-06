import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})

export class LoginService {
  //private_url: string = "http://localhost:8080/api/login?credentials=";
  private_url: string = "https://smart-house-api.herokuapp.com/api/login?credentials=";
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { 
  }

  Login(credentials:string):Observable<boolean> {
    var url = this.private_url + credentials;
    return this.http.get<boolean>(url, {
      headers: new HttpHeaders ({
        'Access-Control-Allow-Origin' : 'https://smart-house-api.herokuapp.com',
        'Content-Type': 'application/json'
      })})
  }
}
