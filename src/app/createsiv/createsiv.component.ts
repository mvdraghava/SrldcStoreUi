import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import { RequestserviceService } from '../requestservice.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Employee {
  id: number;
  name: string;
  department: string;
  designation: string;
  emp_no: string;
}

@Component({
  selector: 'app-createsiv',
  templateUrl: './createsiv.component.html',
  styleUrls: ['./createsiv.component.css']
})
export class CreatesivComponent implements OnInit {
  employees: Employee[] = [{
    id: 0,
    name: '',
    emp_no: '',
    department: '',
    designation: ''
  }];
  issueFilteredemployees: Observable<Employee[]>;
  issueReasons = [
    {value: 'Work', viewValue: 'Work'},
    {value: 'O&M', viewValue: 'O&M'},
    {value: 'On Returnable Loan', viewValue: 'On Returnable Loan'},
    {value: 'Personal Use', viewValue: 'Personal Use'},
    {value: '', viewValue: 'Other'}
  ];
  createsivForm = this.fb.group({
    issued_reason: ['', Validators.required],
    issued_to: ['', [Validators.required, this.validateEmployee]]
  });

  @Output() sivcreated = new EventEmitter<any>();
  @Output() gotosrv = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private rs: RequestserviceService) {
    this.rs.getEmployees().subscribe(
      data => {
        this.employees = data;
        this.issueFilteredemployees = this.createsivForm.controls.issued_to.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterEmployees(name) : this.employees.slice())
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

  send_siv_details() {
    this.sivcreated.emit(this.createsivForm.value);
  }

  validateEmployee(c: FormControl) {

    return c.value.id ? null : {
      validateEmployee: {
        valid: false
      }
    };
  }

  displayFn(emp?: Employee): string | undefined {
    return emp ? emp.name : undefined;
  }

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.name.toLowerCase().includes(filterValue));
  }

  go_to_srv() {
    this.gotosrv.emit('gotosrv');
  }

}
