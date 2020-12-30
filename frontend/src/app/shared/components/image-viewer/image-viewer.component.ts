import { Component, OnInit } from '@angular/core';
import { ComponentLoaderService } from 'src/app/core/services/others/component-loader.service';

@Component({
  selector: 'wal-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  imagePath: any;

  constructor(private componentLoader: ComponentLoaderService) {}

  ngOnInit(): void {}

  onClose(): void {
    this.componentLoader.clearDynamicComponent();
  }
}
