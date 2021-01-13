import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { ImageViewerComponent } from 'src/app/shared/components/image-viewer/image-viewer.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  rootViewContainer: ViewContainerRef | null = null;

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.rootViewContainer = viewContainerRef;
  }

  showImageViewerComponent(component: Type<ImageViewerComponent>, imagePath: string): void {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const componentRef = this.rootViewContainer!.createComponent(factory);
    componentRef.instance.imagePath = imagePath;
  }

  clearDynamicComponent(): void {
    this.rootViewContainer?.remove();
  }
}
