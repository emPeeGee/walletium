import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'wal-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  @ViewChild('drawer') public drawer: MatDrawer | null = null;

  public isSidenavOpened = true;

  toggleSidenav(): void {
    void this.drawer?.toggle();
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
