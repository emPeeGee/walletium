import { Directive, HostListener } from '@angular/core';
import { NavigationService } from 'src/app/core/services/others/navigation.service';

@Directive({
  selector: '[walBackAction]'
})
export class BackActionDirective {
  constructor(private navigation: NavigationService) {}

  @HostListener('click')
  onClick(): void {
    this.navigation.back();
  }
}
