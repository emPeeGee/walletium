import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountsLayoutComponent } from './components/accounts-layout/accounts-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LabelsLayoutComponent } from './components/labels-layout/labels-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'accounts',
    component: AccountsLayoutComponent
  },
  {
    path: 'accounts/details/:accountId',
    component: AccountDetailComponent
  },
  {
    path: 'labels',
    component: LabelsLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
