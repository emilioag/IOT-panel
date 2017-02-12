/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AppState } from './app.service';
import * as echarts from 'echarts';
import * as moment from 'moment';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav-bar [elements]="elements"></nav-bar>
    <br>
    <div class="container">
      <kpi size="3" title="Max Temp" value="25" unit="º" status="high" icon="fa fa-thermometer-full"></kpi>
      <kpi size="3" title="Max Hum" value="20" unit="%" status="medium" icon="fa fa-shower"></kpi>
      <kpi size="3" title="Min Temp" value="10" unit="%" status="low" icon="fa fa-thermometer-full"></kpi>
      <kpi size="3" title="Min Hum" value="20" unit="%" status="medium" icon="fa fa-shower"></kpi>

      <div class="col-md-8 box">
          <div class="row header">
              <div class="col-md-12 titulo">Evolución de la temperatura</div>
          </div>
          <div class="row data">
              <div class="col-md-12">
                <div #chart style="height: 350px;"></div>
              </div>
          </div>
      </div>

      <div class="col-md-4 box">
          <div class="row header">
              <div class="col-md-12 titulo">Temperatura Actual</div>
          </div>
          <div class="row data">
              <div class="col-md-12">
                <div #chart2 style="height: 350px;"></div>
              </div>
          </div>
      </div>

    </div>


    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('chart') chart:ElementRef;
  @ViewChild('chart2') chart2:ElementRef;
  public elements = [
    { name: '', route: './', icon: 'fa fa-home', iconStyle: 'iconwhite' },
    { name: '', route: './', icon: 'fa fa-cog', iconStyle: 'iconwhite' },
    { name: '', route: './', icon: 'fa fa-sign-out', iconStyle: 'iconwhite' }
  ];
  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    let myChart = echarts.init(this.chart.nativeElement);
    let to = moment().unix(),
        from = moment().subtract(3, 'year').unix();
    this.appState.getTemperatureBy('avg', from, to, 'day').subscribe(response => {
      let option = {
        tooltip: { },
        legend: { data: [ 'Temperature' ] },
        xAxis: { data: response.x },
        yAxis: { },
        series: [{
          name: 'Temperature',
          type: 'line',
          data: response.y
        }]
      };
      myChart.setOption(option);
    });

    let myChart2 = echarts.init(this.chart2.nativeElement);
    let option2 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}º"
        },
        series: [
            {
                name: 'Temperatura',
                type: 'gauge',
                detail: {formatter:'{value}%'},
                data: [{value: 19}]
            }
        ]
    };
    myChart2.setOption(option2);

  }

}