import { AfterViewInit, Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SensorsDataTableDataSource } from './sensors-data-table-datasource';
import { SensorsDataService } from '../sensors-data.service';
import { SensorsData } from '../sensorsData-model';

@Component({
  selector: 'app-sensors-data-table',
  templateUrl: './sensors-data-table.component.html',
  styleUrls: ['./sensors-data-table.component.css']
})
export class SensorsDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SensorsData>;
  dataSource: SensorsDataTableDataSource;

  readonly_t : boolean = false;
  sort_t1: any = null;
  sort_t2: any = null;

  readonly_m : boolean = false;
  sort_m1: any = null;
  sort_m2: any = null;

  readonly_d : boolean = false;
  sort_d1: any = null;
  sort_d2: any = null;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['data_time', 'temp', 'moist'];
  public data: SensorsData[] = [];


  constructor(private _sensorsDataService : SensorsDataService) {
    this.dataSource = new SensorsDataTableDataSource(_sensorsDataService);
  }
  ngOnInit(): void {
    if (localStorage.getItem("sort_t1")) {
        this.sort_t1 = localStorage.getItem("sort_t1");
        this.sort_t2 = localStorage.getItem("sort_t2");
        this.readonly_t = true;
    }

    if (localStorage.getItem("sort_m1")) {
      this.sort_m1 = localStorage.getItem("sort_m1");
      this.sort_m2 = localStorage.getItem("sort_m2");
      this.readonly_m = true;
    }

    if (localStorage.getItem("sort_d1")) {
      this.sort_d1 = localStorage.getItem("sort_d1");
      this.sort_d2 = localStorage.getItem("sort_d2");
      this.readonly_d = true;
    }

    this._sensorsDataService.getData().subscribe((response: SensorsData[]) =>{
      this.data = [];
      for (const key in response) {
        let data = new SensorsData();
        data.temp = response[key].temp;
        data.moist = response[key].moist;
        data.data_time = response[key].data_time;

        if ( localStorage.getItem("sort_d1")) {
          let a = data.data_time.substring(0,19);
          if ( a > this.sort_d1 && a < this.sort_d2) {
            data.data_time = data.data_time.replace('T', ", ")
            data.data_time = data.data_time.substring(0, 20)
            this.data.push(data);
          }
        } else {
          data.data_time = data.data_time.replace('T', ", ")
          data.data_time = data.data_time.substring(0, 20)
          this.data.push(data);
        }

      }
      if (localStorage.getItem("sort_t1")) {
        this.data = this.data.filter(s=> s.temp > this.sort_t1 && s.temp < this.sort_t2 );
      }

      if (localStorage.getItem("sort_m1")) {
        this.data = this.data.filter(s=> s.moist > this.sort_m1 && s.moist < this.sort_m2 );
      }

      this.dataSource.data = this.data;
    });

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.connect();
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }


  removeFilter_t() {
    this.readonly_t = false;
    localStorage.removeItem("sort_t1");
    localStorage.removeItem("sort_t2");
    this.sort_t1 = null;
    this.sort_t2 = null;
    window.location.reload();
  }
  addFilter_t() {

    if (this.sort_t1 != null || this.sort_t2 != null ) {

      
      if (this.sort_t1 == null){
        this.sort_t1 = -999;
      }

      if (this.sort_t2 == null) {
        this.sort_t2 = 999;
      }

      localStorage.setItem("sort_t1", this.sort_t1);
      localStorage.setItem("sort_t2", this.sort_t2);
      this.readonly_t = true;

      window.location.reload();
    }
  }

  removeFilter_m() {
    this.readonly_m = false;
    localStorage.removeItem("sort_m1");
    localStorage.removeItem("sort_m2");
    this.sort_m1 = null;
    this.sort_m2 = null;
    window.location.reload();
  }

  addFilter_m() {

    if (this.sort_m1 != null || this.sort_m2 != null ) {

      
      if (this.sort_m1 == null){
        this.sort_m1 = -999;
      }

      if (this.sort_m2 == null) {
        this.sort_m2 = 999;
      }

      localStorage.setItem("sort_m1", this.sort_m1);
      localStorage.setItem("sort_m2", this.sort_m2);
      this.readonly_m = true;

      window.location.reload();
    }
  }
  
  removeFilter_d() {
    this.readonly_d = false;
    localStorage.removeItem("sort_d1");
    localStorage.removeItem("sort_d2");
    this.sort_d1 = null;
    this.sort_d2 = null;
    window.location.reload();
  }

  addFilter_d() {
    

    if (this.sort_d1 != null || this.sort_d2 != null ) {

      
      if (this.sort_d1 == null){
        this.sort_d1 = '1900-01-01T12:00';
      }

      if (this.sort_d2 == null) {
        this.sort_d2 = '9999-01-01T12:00';
      }

      this.sort_d1 = this.sort_d1 + ':00';
      this.sort_d2 = this.sort_d2 + ':00';

      localStorage.setItem("sort_d1", this.sort_d1);
      localStorage.setItem("sort_d2", this.sort_d2);
      this.readonly_d = true;

      window.location.reload();
    }
  }
}
