

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { EmployeeDashboardComponent } from './EmployeeDashboardComponent';



@Component({
  selector: 'app-root',
  template: `<app-employee-dashboard>`
})
export class AppComponent implements OnInit {
  title = 'My Employee Dashboard';
  employees: any[] = [];
  currentSortField!: string;
  sortDirection!: string;


  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    console.log('Sort function called with field3:');
    
    this.fetchEmployees();
  }


  fetchEmployees(): void {

    this.http.get<any>('http://localhost:8081/api/employees')
      .subscribe(data => {
        this.employees = data;
      });
  }

  
  
}
