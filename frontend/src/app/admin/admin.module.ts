import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockComponent } from './mock/mock.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesLayoutComponent } from './components/categories-layout/categories-layout.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';

@NgModule({
  declarations: [MockComponent, AdminLayoutComponent, CategoriesLayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class AdminModule {}
