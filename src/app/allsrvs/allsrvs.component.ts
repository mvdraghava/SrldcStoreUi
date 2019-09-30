import { Component, OnInit } from '@angular/core';
import { RequestserviceService } from '../requestservice.service';
import { SrvsivDetails } from '../srvsivDetails';

@Component({
  selector: 'app-allsrvs',
  templateUrl: './allsrvs.component.html',
  styleUrls: ['./allsrvs.component.css']
})
export class AllsrvsComponent implements OnInit {
  srvs: any[] =  [];
  selectedsrvsiv = new SrvsivDetails();
  showDetails = false;
  displayedColumns: string[] = ['id', 'name_supplier', 'indent_department', 'indent_ref_no'];
  constructor(private rs: RequestserviceService) { }

  ngOnInit() {
    this.rs.getsrvs().subscribe(
      response => {
        this.srvs = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  showDetail(row){
    window.scrollTo(0, 0);
    this.selectedsrvsiv = row;
    this.showDetails = true;
    console.log(row);
  }

  getList() {
    window.scrollTo(0, 0);
    this.showDetails = false;
  }

}
