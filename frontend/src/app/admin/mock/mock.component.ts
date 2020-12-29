import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentLoaderService } from 'src/app/core/services/component-loader.service';
import { ImageViewerComponent } from 'src/app/shared/components/image-viewer/image-viewer.component';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss']
})
export class MockComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
