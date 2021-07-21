import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SensorsData } from './sensorsData-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorsDataService {

  constructor(private http: HttpClient) { 

  }

  getData() : Observable<SensorsData[]> {
    return     this.http.get<SensorsData[]>('http://localhost:8080/api/sensorsData', {
      headers: new HttpHeaders ({
        'Access-Control-Allow-Origin' : 'http://localhost:8080',
        'Content-Type': 'application/json'
      })})

  }

}
