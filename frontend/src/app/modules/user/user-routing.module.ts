import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountsLayoutComponent } from './components/accounts-layout/accounts-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LabelsLayoutComponent } from './components/labels-layout/labels-layout.component';
import { RecordComponent } from './components/record/record.component';
import { ContainerComponent } from './containers/container/container.component';
import { RecordsComponent } from './containers/records/records.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'labels', component: LabelsLayoutComponent },
      {
        path: 'accounts',
        children: [
          { path: '', component: AccountsLayoutComponent },
          { path: 'details/:accountId', component: AccountDetailComponent }
        ]
      },
      {
        path: 'records',
        children: [
          { path: '', component: RecordsComponent },
          { path: ':id', component: RecordComponent },
          { path: 'new', component: RecordComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
