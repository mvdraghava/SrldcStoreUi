import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  department: string;
  designation: string;
  emp_no: string;
}

export interface SuccessData {
  id: number;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestserviceService {
  addserviceURL = '/srvsivapi/createsrvsiv';
  getsrvsURL = '/srvsivapi/getsrvs';
  getemployeesURL = '/srvsivapi/getemployees';
  constructor(private http: HttpClient) { }

  addsrvsiv(srvsivdata): Observable<SuccessData> {
    return this.http.post<SuccessData>(this.addserviceURL, srvsivdata);
  }

  getsrvs() {
    return this.http.get(this.getsrvsURL);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getemployeesURL);
  }
}
