import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationAdminGuard } from './core/guards/authentication-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'guest', pathMatch: 'full' },
  {
    path: 'guest',
    loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule)
  },
  {
    path: 'admin',
    canActivate: [AuthenticationAdminGuard],
    canLoad: [AuthenticationAdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
