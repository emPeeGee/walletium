import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentLoaderService } from './core/services/others/component-loader.service';
import { UserActiveService } from './core/services/others/user-active.service';

@Component({
  selector: 'wal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'walletium';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentLoader: ComponentLoaderService,
    private userActiveService: UserActiveService
  ) {}

  ngOnInit(): void {
    this.componentLoader.setRootViewContainerRef(this.viewContainerRef);
    this.listenToEvents();
  }

  listenToEvents(): void {
    window.onload = () => {
      this.userActiveService.checkExpiredSesion();
    };

    window.onmousedown = () => {
      this.userActiveService.checkExpiredSesion();
    };

    window.onclick = () => {
      this.userActiveService.checkExpiredSesion();
    };

    window.onkeypress = () => {
      this.userActiveService.checkExpiredSesion();
    };
  }
}
