import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestserviceService {
  addserviceURL = 'http://localhost:8000/srvsivapi/createsrvsiv';
  getsrvsURL = 'http://localhost:8000/srvsivapi/getsrvs';
  constructor(private http: HttpClient) { }

  addsrvsiv(srvsivdata) {
    return this.http.post(this.addserviceURL, srvsivdata);
  }

  getsrvs() {
    return this.http.get(this.getsrvsURL);
  }
}
