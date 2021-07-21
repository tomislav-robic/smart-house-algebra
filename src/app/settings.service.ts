import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Settings } from './settings-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //private url: string = "http://localhost:8080/api/currentState";
  private url: string = "https://smart-house-api.herokuapp.com/api/currentState";
  private newInterval: number = 0;


  constructor(private http:HttpClient) { 
  }

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(this.url);
  }

  changeSettings(data:Settings) {
    this.http.post<Settings>(this.url, data, {
      headers: new HttpHeaders ({
        'Access-Control-Allow-Origin' : 'https://smart-house-api.herokuapp.com',
        'Content-Type': 'application/json'
      })}).subscribe();
  }
}
//s