import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Employee} from './employee';
import {EmployeeService} from './employee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees : Employee[];
  public editEmployee : Employee;
  public deleteEmployee : Employee;
  public testvar  = 0;
  constructor(private employeeService :EmployeeService){}

  ngOnInit()
  {this.getEmployees();}
  
  searchemployees(test : string ) {
    const res : Employee[] = [];
    for (const emp of this.employees) 
    { 
      if(emp.name.toLowerCase().indexOf(test.toLowerCase())!== -1
      ||emp.email.toLowerCase().indexOf(test.toLowerCase())!== -1
      ||emp.phone.toLowerCase().indexOf(test.toLowerCase())!== -1
      ||emp.jobTitle.toLowerCase().indexOf(test.toLowerCase())!== -1)
       {
          res.push(emp);
       }
     }
         this.employees=res;
       if (res.length===0 || !test)
              {
         this.getEmployees();
       }
  }
  public getEmployees() : void {
     this.employeeService.getEmployees().subscribe(
    (response:Employee[])=> {this.employees=response;  
     },
    (error: HttpErrorResponse) =>
    { alert(error.message);}
     );
  }

  public onOpenModal(employee:Employee,mode:string) :void
{
  const container = document.getElementById('container-id')
 const button = document.createElement('button')
button.type='button';
button.style.display='none';
button.setAttribute('data-toggle','modal');
if (mode==='add')
  {
button.setAttribute('data-target','#addEmployeeModal');
  }
if (mode==='edit')
  {
    this.editEmployee=employee;
    button.setAttribute('data-target','#updateEmployeeModal');
  }
if (mode==='delete')  
  {
    this.deleteEmployee = employee;
    button.setAttribute('data-target','#deleteEmployeeModal');  
  }
 container.appendChild(button);
 button.click();
}

public onAddEmployee(addform : NgForm) : void 
{
  document.getElementById('add-employee-form').click();
  this.employeeService.addEmployee(addform.value).subscribe(
    (response: Employee) => {
      console.log(response);
      this.getEmployees();
      addform.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addform.reset();
    }
  );
}

public onUpdateEmployee(employee : Employee) : void 
 {
  this.employeeService.updateEmployee(employee).subscribe(
    (response: Employee) => {
      console.log(response);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
 }
 public onDeleteEmloyee(id: number) :void
 {
  this.employeeService.deleteEmployee(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
 }
}
