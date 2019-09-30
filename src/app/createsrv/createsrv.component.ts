import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-createsrv',
  templateUrl: './createsrv.component.html',
  styleUrls: ['./createsrv.component.css']
})
export class CreatesrvComponent implements OnInit {
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
    indent_date: new Date(),
    indent_department: ['', Validators.required],
    inspected_by: this.formbuilder.group({
      emp_no: ['', Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required]
    }),
    inspected_countersigned_by: this.formbuilder.group({
      emp_no: ['', Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required]
    }),
    received_by: this.formbuilder.group({
      emp_no: [{value: '40055' , disabled: true}],
      name: [{value: 'P.K. Sadhu', disabled: true}],
      designation: [{value: 'Store Incharge', disabled: true}],
      department: [{value: 'SO-II', disabled: true}]
    }),
    received_countersigned_by: this.formbuilder.group({
      emp_no: ['', Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required]
    }),
    items: this.formbuilder.array([
      this.formbuilder.group({
        description: '',
        received_qty: '',
        rejected_qty: '',
        unit_rate: ''
      })
    ]),
    remarks: ''
  });

  @Output() srvcreated = new EventEmitter<any>();
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.createsrvForm.value);
  }

  get items() {
    return this.createsrvForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(
      this.formbuilder.group({
        description: '',
        received_qty: '',
        rejected_qty: '',
        unit_rate: ''
      })
    )
  }

  removeItem(remove_index: number){
    this.items.removeAt(remove_index);
  }

  send_details() {
    this.srvcreated.emit(this.createsrvForm.getRawValue());
  }

}
