import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentLoaderService } from './core/services/component-loader.service';
import { NavigationService } from './core/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'walletium';

  constructor(
    private navigation: NavigationService,
    private viewContainerRef: ViewContainerRef,
    private componentLoader: ComponentLoaderService
  ) {}

  ngOnInit(): void {
    this.componentLoader.setRootViewContainerRef(this.viewContainerRef);
  }
}
