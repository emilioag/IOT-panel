import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'kpi',
  providers: [],
  styleUrls: [ './kpi.component.css' ],
  templateUrl: './kpi.component.html'
})
export class KpiComponent implements OnInit {
    @Input() size:number = 4;
    @Input() title:string = "title";
    @Input() value:string = "value";
    @Input() unit:string = "unit";
    @Input() status:string = "default";
    @Input() icon:string = "";

    statuses:any = {
      default: 'beige',
      high: '#d9536b',
      medium: '#f0ad4e',
      low: '#5bc0de'
    }
    constructor() {}
    public ngOnInit () {}
}