import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockComponent } from './mock/mock.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [MockComponent],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
