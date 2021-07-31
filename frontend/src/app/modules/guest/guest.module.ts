import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { GuestRoutingModule } from './guest-routing.module';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, WelcomeComponent],
  imports: [GuestRoutingModule, SharedModule]
})
export class GuestModule {}
