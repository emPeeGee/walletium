import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentLoaderService } from './core/services/others/component-loader.service';
import * as moment from 'moment';

// Set moment to use Monday as a first day of the week
moment.updateLocale('en', {
  week: {
    dow: 1
  }
});

@Component({
  selector: 'wal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private viewContainerRef: ViewContainerRef, private componentLoader: ComponentLoaderService) {}

  ngOnInit(): void {
    this.componentLoader.setRootViewContainerRef(this.viewContainerRef);
  }
}
