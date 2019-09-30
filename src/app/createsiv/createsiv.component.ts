import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-createsiv',
  templateUrl: './createsiv.component.html',
  styleUrls: ['./createsiv.component.css']
})
export class CreatesivComponent implements OnInit {
  issueReasons = [
    {value: 'Work', viewValue: 'Work'},
    {value: 'O&M', viewValue: 'O&M'},
    {value: 'On Returnable Loan', viewValue: 'On Returnable Loan'},
    {value: 'Personal Use', viewValue: 'Personal Use'},
    {value: '', viewValue: 'Other'}
  ];
  createsivForm = this.fb.group({
    issued_reason: ['', Validators.required],
    issued_to: this.fb.group({
      emp_no: ['', Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required]
    })
  });

  @Output() sivcreated = new EventEmitter<any>();
  @Output() gotosrv = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  send_siv_details() {
    this.sivcreated.emit(this.createsivForm.value);
  }

  go_to_srv() {
    this.gotosrv.emit('gotosrv');
  }

}
