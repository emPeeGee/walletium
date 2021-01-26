import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentLoaderService } from './core/services/others/component-loader.service';

@Component({
  selector: 'wal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'walletium';

  constructor(private viewContainerRef: ViewContainerRef, private componentLoader: ComponentLoaderService) {}

  ngOnInit(): void {
    this.componentLoader.setRootViewContainerRef(this.viewContainerRef);
  }
}
