import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wal-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  isSidenavOpened = true;

  constructor() {}

  ngOnInit(): void {}
}
