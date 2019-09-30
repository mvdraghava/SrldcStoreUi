import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import {DownloadPDF} from './downloadPDF';
import { RequestserviceService } from '../requestservice.service';
import { SrvsivDetails } from '../srvsivDetails';



@Component({
  selector: 'app-srvsivform',
  templateUrl: './srvsivform.component.html',
  styleUrls: ['./srvsivform.component.css'],
  providers: [ RequestserviceService ]
})
export class SrvsivformComponent implements OnInit {
  srvForm = this.fb.group({
    srv_details: '',
  });

  sivForm = this.fb.group({
    siv_details: ''
  });

  testString = 'Hello';
  srvsivDetails = new SrvsivDetails();

  constructor(private fb: FormBuilder, private rs: RequestserviceService) { }

  ngOnInit() {
  }

  gotoSiv(stepper: MatHorizontalStepper, srvdetails) {
    stepper.selected.completed = true;
    stepper.next();
    this.srvsivDetails.srvdetails = srvdetails;
  }

  gobackSrv(stepper: MatHorizontalStepper) {
    stepper.previous();
  }

  gotoDetails(stepper: MatHorizontalStepper, sivdetails) {
    stepper.selected.completed = true;
    stepper.next();
    this.srvsivDetails.sivdetails = sivdetails;
  }

  downloadPDF() {
    this.rs.addsrvsiv(this.srvsivDetails).subscribe(
      data => {
        const dpdf  = new DownloadPDF();
        dpdf.downloadSRVPDF(this.srvsivDetails.srvdetails);
        dpdf.downloadSIVPDF(this.srvsivDetails.sivdetails, this.srvsivDetails.srvdetails);
      },
      error => {
        console.log( error);
      }
    );

  }

}
