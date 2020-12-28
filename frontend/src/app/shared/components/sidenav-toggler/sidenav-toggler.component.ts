import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wal-sidenav-toggler',
  templateUrl: './sidenav-toggler.component.html',
  styleUrls: ['./sidenav-toggler.component.scss']
})
export class SidenavTogglerComponent implements OnInit {
  @Input() state: boolean | undefined;

  constructor() {}

  ngOnInit(): void {}
}
