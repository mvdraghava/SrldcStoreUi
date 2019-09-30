import { Component, OnInit, Input } from '@angular/core';
import { SrvsivDetails } from '../srvsivDetails';

@Component({
  selector: 'app-showdetails',
  templateUrl: './showdetails.component.html',
  styleUrls: ['./showdetails.component.css']
})
export class ShowdetailsComponent implements OnInit {
  employeeDetails = ['inspected_by', 'inspected_countersigned_by','received_by','received_countersigned_by'];
  employeeDetailsDisplay = [
    'Inspected',
    'CounterSigned ',
    'Received',
    'CounterSigned'];

  displayedColumns: string[] = ['SlNo', 'description', 'received_qty', 'rejected_qty', 'taken_in_stock', 'unit_rate', 'total_value'];

  @Input() srvsivDetails: SrvsivDetails;
  //srvsivDetails1 = { "srvdetails": { "mode_of_receipt": "PO", "name_supplier": "jfgn", "indent_ref_no": "nfmd,", "indent_date": "2019-09-29T07:52:02.662Z", "indent_department": "fffshgfcx", "inspected_by": { "emp_no": "gfbbmdnb", "name": "bfn,dn", "designation": "bfn,bvcnm", "department": "n,vbxn" }, "inspected_countersigned_by": { "emp_no": "vbmcbvnfj", "name": ",bnmbxcnm", "designation": "bnmb,cxnm", "department": "ncc,vmx" }, "received_by": { "emp_no": "40055", "name": "P.K. Sadhu", "designation": "Store Incharge", "department": "SO-II" }, "received_countersigned_by": { "emp_no": "vbnfhg", "name": "lkfdgj", "designation": "kjfsklfj", "department": "kjfldkjl" }, "items": [ { "description": "gfdhjkfgj", "received_qty": 25, "rejected_qty": 12, "unit_rate": "26" }, { "description": "hvghdfjg", "received_qty": 45, "rejected_qty": 23, "unit_rate": "26" } ], "remarks": "gjhdkhfgur" }, "sivdetails": { "issued_reason": "gfjhhgkdfj", "issued_to": { "emp_no": "fgdkjg", "name": "fdhgjkfhdhg fhjgjhfdgh dfghjsfghdfg shjghjsk", "designation": "fgjkdhk", "department": "fgdhjkh" } } };

  constructor() { }

  ngOnInit() {
  }

}
