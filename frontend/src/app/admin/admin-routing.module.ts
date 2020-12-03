import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MockComponent } from './mock/mock.component';

const routes: Routes = [{ path: '', component: MockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
