import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { CategoriesLayoutComponent } from './components/categories-layout/categories-layout.component';
import { MockComponent } from './mock/mock.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'categories',
        component: CategoriesLayoutComponent
      },
      {
        path: 'mock',
        component: MockComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
