import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiService} from '../api.service'

let AUTH_API = '';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    private api: ApiService) { 
    AUTH_API = api.endpoint
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/signin', {
      username,
      password
    }, httpOptions);
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}
