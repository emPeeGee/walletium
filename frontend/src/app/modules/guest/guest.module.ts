import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent, WelcomeComponent],
  imports: [CommonModule, GuestRoutingModule, SharedModule]
})
export class GuestModule {}
