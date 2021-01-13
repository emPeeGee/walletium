import { Component } from '@angular/core';
import { ComponentLoaderService } from 'src/app/core/services/others/component-loader.service';

@Component({
  selector: 'wal-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {
  public imagePath = '';

  constructor(private componentLoader: ComponentLoaderService) {}

  onClose(): void {
    this.componentLoader.clearDynamicComponent();
  }
}
