import { ComponentFactoryResolver, Inject, Injectable, ViewContainerRef, Injector } from '@angular/core';
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

  showImageViewerComponent(component: any, imagePath: string): void {
    const factory = this.factoryResolver.resolveComponentFactory<ImageViewerComponent>(component);
    const componentRef = this.rootViewContainer?.createComponent<ImageViewerComponent>(factory);
    componentRef!.instance.imagePath = imagePath;

    // const createdComponent = factory.create(this.rootViewContainer!.injector);

    // this.rootViewContainer?.insert(createdComponent.hostView);
  }

  clearDynamicComponent(): void {
    this.rootViewContainer?.remove();
  }
}
