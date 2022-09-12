
import { Component , OnInit, ViewChild} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, ThemeService } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ApiService } from '../api.service';
import { getHumidity, humiditiyData } from '../apiSchema/getHumidity'
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public lable:String[] = [];
  public value:number[] = [];
  selected = '1';
  public autostart = true;
  public auth = 'no'
  public testAuth(){
    return this.apiservice.testAuth().subscribe((data:any)=>{
      this.auth = data;
    })
  }
  public getAutostart(){
    return this.apiservice.getautostart().subscribe((data:any)=>{
      if(data.autostart==true) this.autostart =true
      if(data.autostart==false) this.autostart =false
    })
  }
  public setAutostart(set:string){
    return this.apiservice.setAutostart(set).subscribe((data:any)=>{
      this.getAutostart()
    })
  }
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'line';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'line'> = {
    labels: this.lable,
          datasets: [
            { data: this.value, label: 'Feuchtigkeit' }
          ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public loadHumidity(){

    let humData = this.apiservice.getHumidity(this.selected)
    .subscribe((data:any) => {    
      this.value.splice(0,this.value.length)
      this.lable.splice(0,this.lable.length)
      //this.lable = ['1','2','3','4','5'] 
      data.forEach((ele:any) =>{
        let formDat = new Date(ele.date);
       // console.log(formDat.getDay()+"."+ formDat.getMonth()+". "+ formDat.getHours()+":00")
       let dates = ele.date.split("T")[0];
       let day = dates.split("-")[2]
       let month = dates.split("-")[1]
       let times = ele.date.split("T")[1];
       let hour = times.split(":")[0];
       let min = times.split(":")[1];
       let lab = day+"."+month+". "+hour+":"+min
        this.lable.push( lab+" "+ ele.value)
        let val = (ele.value- 300) * -1 + 100;
        this.value.push(val)
      })
      this.chart?.update();
    });
  }
  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
         
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
       
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private apiservice:ApiService
    ) {}
  ngOnInit(): void {
    this.loadHumidity();
    this.getAutostart();
    this.testAuth()
  }

}
