import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
config: Config | undefined;
  constructor(
    private http: HttpClient
    ) { }

  getConfig(){
     return this.http.get<Config>('/api/getconfig').subscribe((data: Config) => this.config = { ...data });;
  }

  getHumidity(){
    return this.http.get('https://10.8.0.6/api/gethumidity').subscribe((data: any) =>  {  data });;
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