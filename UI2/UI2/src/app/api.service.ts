import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { getHumidity, humiditiyData } from './apiSchema/getHumidity'
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public endpoint = ''

config: Config | undefined;
  constructor(
    private http: HttpClient
    ) { }

  getConfig(){
     return this.http.get<Config>(this.endpoint+'/api/getconfig').subscribe((data: Config) => this.config = { ...data });;
  }

  getHumidity(type:any): Observable<getHumidity>{
     return this.http.get<getHumidity>(this.endpoint+'/api/gethumidity?type='+type);
  }
  testAuth(): Observable<any>{
     return this.http.get(this.endpoint+'/api/testauth');
  }
  getautostart(): Observable<any>{
     return this.http.get(this.endpoint+'/api/automatic');
  }
  setAutostart(set: string): Observable<any> {
    return this.http.post(this.endpoint + '/api/automatic', {
      set
    }, httpOptions);
  }
}
export interface Config {
  controller: Controller;
}
export interface Controller {
  name: String,
  ip: String,
  pass: String,
  status: Boolean,
  pins: Pins
}

export interface Pins{
  name: String,
  number: String,
  type: String,
  onload: String
}