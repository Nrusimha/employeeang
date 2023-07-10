import { Component, OnInit } from '@angular/core';
import { EmployerService } from './employer.service';
import { Employer } from './employer.model';
import { NgxCsvParser } from 'ngx-csv-parser'; // Import the NgxCsvParser module
import { saveAs } from 'file-saver'; // Import the saveAs function from 'file-saver'


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employees: Employer[] = [];
  filteredEmployees: Employer[] = [];
  query: string = '';
  sortField: string = '';
  sortDirection: string = 'asc';
  nameFilter: string = '';
salaryFilter: number | null = null;
  

  constructor(private employeeService: EmployerService,private ngxCsvParser: NgxCsvParser) {
    
   }

   

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployers()
      .subscribe(employees => {
        this.employees = employees;
        this.filteredEmployees = [...employees];
      });
  }

  filterEmployees(): void {
    if (!this.query) {
      this.filteredEmployees = [...this.employees];
      return;
    }

    const lowerCaseQuery = this.query.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
    
      employee.employeeId.toLowerCase().includes(lowerCaseQuery) ||
      employee.firstName.toLowerCase().includes(lowerCaseQuery) ||
      employee.lastName.toLowerCase().includes(lowerCaseQuery) ||
      employee.salary.toLowerCase().includes(lowerCaseQuery)||
      employee.email.toLowerCase().includes(lowerCaseQuery) ||
      employee.department.toLowerCase().includes(lowerCaseQuery) ||
      employee.position.toLowerCase().includes(lowerCaseQuery) 
    );
  }

  /*filterSalary(): void {
    this.filteredEmployees = this.employees.filter(employee => {
      const meetsNameFilter = this.nameFilter === '' || employee.firstName.toLowerCase().includes(this.nameFilter.toLowerCase());
      const meetsSalaryFilter = this.salaryFilter === null || employee.salary >= this.salaryFilter;
      return meetsNameFilter && meetsSalaryFilter;
    }); */
  
  
 /* filterSalary(): void {
    this.filteredEmployees = this.employees.filter(employee => {
      const meetsMinSalary = this.minSalary === null || employee.salary >= this.minSalary;
      const meetsMaxSalary = this.maxSalary === null || employee.salary <= this.maxSalary;
      return meetsMinSalary && meetsMaxSalary;
    });
  }*/
  
  
  /*filterSalary(): void {
    if (!this.query) {
      this.filteredEmployees = [...this.employees];
      return;
    }

    const lowerCaseQuery = this.query.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      (this.query === '' || (
      employee.employeeId.toLowerCase().includes(lowerCaseQuery) ||
      employee.firstName.toLowerCase().includes(lowerCaseQuery) ||
      employee.lastName.toLowerCase().includes(lowerCaseQuery) ||
      
      employee.email.toLowerCase().includes(lowerCaseQuery) ||
      employee.department.toLowerCase().includes(lowerCaseQuery) ||
      employee.position.toLowerCase().includes(lowerCaseQuery) )) &&
      
    (this.salaryFilter === null || employee.salary > this.salaryFilter) 
    );
  }*/

  sortEmployees(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredEmployees.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  exportData(): void {
    const csvContent: string = this.convertToCSV(this.filteredEmployees);
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'employees.csv');
  }
  
  private convertToCSV(data: Employer[]): string {
    const header = ['Name', 'Email', 'Department', 'Position', 'Salary'];
    const rows = data.map((employee: Employer) => [
      employee.firstName,
      employee.lastName,
      employee.employeeId,
      employee.email,
      employee.department,
      employee.position,
      employee.salary.toString()
    ]);
  
    const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');
    return csvContent;
  }
  
}


