import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'nav-bar',
  providers: [],
  styleUrls: [ './navbar.component.css' ],
  templateUrl: './navbar.component.html'
})
export class NavBarComponent implements OnInit {
    @Input() elements:any[] = [];
    constructor() {}
    public ngOnInit () {}
}