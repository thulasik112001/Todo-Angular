import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getHello() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }
  addtoFirebase(data:any) {
    return this.http.get(`https://library-3c238-default-rtdb.firebaseio.com/`,data);  }
}

