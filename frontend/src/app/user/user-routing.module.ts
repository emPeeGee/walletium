import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsLayoutComponent } from './components/accounts-layout/accounts-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: AccountsLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
