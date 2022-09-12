import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
let API_URL = 'http://localhost:8080/api/test/';
import {ApiService} from '../api.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,private api: ApiService) {
    API_URL = api.endpoint
   }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + '/', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + '/user', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + '/mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + '/admin', { responseType: 'text' });
  }
}
