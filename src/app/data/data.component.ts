import { Component, OnInit } from '@angular/core';
import { SensorsDataService } from '../sensors-data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  sensorsData = [];

  constructor(private _sensorsDataService: SensorsDataService) { }

  ngOnInit(): void {
  }

}
