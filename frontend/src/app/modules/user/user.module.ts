import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountSaveModalComponent } from './components/account-save-modal/account-save-modal.component';
import { AccountsLayoutComponent } from './components/accounts-layout/accounts-layout.component';
import { AccountAddCardComponent } from './components/account-add-card/account-add-card.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { LabelsLayoutComponent } from './components/labels-layout/labels-layout.component';
import { LabelCardComponent } from './components/label-card/label-card.component';
import { LabelSaveModalComponent } from './components/label-save-modal/label-save-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountCardComponent,
    AccountSaveModalComponent,
    AccountsLayoutComponent,
    AccountAddCardComponent,
    AccountDetailComponent,
    LabelsLayoutComponent,
    LabelCardComponent,
    LabelSaveModalComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class UserModule {}
