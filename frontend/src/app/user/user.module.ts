import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountAddModalComponent } from './components/account-add-modal/account-add-modal.component';

@NgModule({
  declarations: [DashboardComponent, AccountCardComponent, AccountAddModalComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class UserModule {}
