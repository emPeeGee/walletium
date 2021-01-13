import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthenticationAdminGuard } from './shared/guards/authentication-admin.guard';

const routes: Routes = [
  {
    path: 'guest',
    loadChildren: () => import('./modules/guest/guest.module').then(m => m.GuestModule)
  },
  {
    path: 'admin',
    canActivate: [AuthenticationAdminGuard],
    canLoad: [AuthenticationAdminGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
