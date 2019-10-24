import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
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
  selector: 'app-createsrv',
  templateUrl: './createsrv.component.html',
  styleUrls: ['./createsrv.component.css']
})
export class CreatesrvComponent implements OnInit {
  inspFilteredemployees: Observable<Employee[]>;
  icountersignFilteredemployees: Observable<Employee[]>;
  rcountersignFilteredemployees: Observable<Employee[]>;
  employees: Employee[] = [{
    id: 0,
    name: '',
    emp_no: '',
    department: '',
    designation: ''

  }];
  modeOfReceipts = ['PO', 'LOA', 'MRN', 'STV', 'MTN'];
  employeeDetails = ['inspected_by', 'inspected_countersigned_by','received_by','received_countersigned_by'];
  employeeDetailsDisplay = [
    'Inspected By Employee Details',
    'Inspected CounterSIgned By Employee Details',
    'Received By Details',
    'Received CounterSigned Details'];
  createsrvForm = this.formbuilder.group({
    mode_of_receipt: ['PO', Validators.required],
    name_supplier: ['', Validators.required],
    indent_ref_no: ['', Validators.required],
    indent_date: [new Date(), Validators.required],
    srvsiv_date: [new Date(), Validators.required],
    indent_department: ['', Validators.required],
    inspected_by: ['', [Validators.required, this.validateEmployee]],
    inspected_countersigned_by: ['', [Validators.required, this.validateEmployee]],
    received_by: this.formbuilder.group({
      id:[{value: 67, disabled: true}],
      emp_no: [{value: '40055' , disabled: true}],
      name: [{value: 'P.K. Sadhu', disabled: true}],
      designation: [{value: 'Store Incharge', disabled: true}],
      department: [{value: 'SO2', disabled: true}]
    }),
    received_countersigned_by: ['', [Validators.required, this.validateEmployee]],
    items: this.formbuilder.array([
      this.formbuilder.group({
        description: '',
        received_qty: '',
        rejected_qty: '',
        unit_rate: ''
      })
    ]),
    remarks: '',
    employee1: '',
    employee2: ''
  });

  @Output() srvcreated = new EventEmitter<any>();
  constructor(private formbuilder: FormBuilder, private rs: RequestserviceService) {
    this.rs.getEmployees().subscribe(
      data => {
        this.employees = data;
        this.inspFilteredemployees = this.createsrvForm.controls.inspected_by.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterEmployees(name) : this.employees.slice())
        );
        this.icountersignFilteredemployees = this.createsrvForm.controls.inspected_countersigned_by.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterEmployees(name) : this.employees.slice())
        );
        this.rcountersignFilteredemployees = this.createsrvForm.controls.received_countersigned_by.valueChanges
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

  onSubmit() {
    console.log(this.createsrvForm.value);
  }

  validateEmployee(c: FormControl) {

    return c.value.id ? null : {
      validateEmployee: {
        valid: false
      }
    };
  }

  get items() {
    return this.createsrvForm.get('items') as FormArray;
  }

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.name.toLowerCase().includes(filterValue));
  }

  displayFn(emp?: Employee): string | undefined {
    return emp ? emp.name : undefined;
  }

  addItem() {
    this.items.push(
      this.formbuilder.group({
        description: '',
        received_qty: '',
        rejected_qty: '',
        unit_rate: ''
      })
    );
  }

  removeItem(remove_index: number){
    this.items.removeAt(remove_index);
  }

  send_details() {
    if (!this.createsrvForm.valid){
      this.createsrvForm.markAllAsTouched();
      window.scrollTo(0, 0);
    } else {
      this.srvcreated.emit(this.createsrvForm.getRawValue());
    }

  }

}
