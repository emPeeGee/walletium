import { Component, Input } from '@angular/core';

@Component({
  selector: 'wal-sidenav-toggler',
  templateUrl: './sidenav-toggler.component.html',
  styleUrls: ['./sidenav-toggler.component.scss']
})
export class SidenavTogglerComponent {
  @Input() state: boolean | undefined;
}
