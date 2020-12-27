import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockComponent } from './mock/mock.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MockComponent, AdminLayoutComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule]
})
export class AdminModule {}
