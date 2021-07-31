import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material/material.module';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidenavTogglerComponent } from './components/sidenav-toggler/sidenav-toggler.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { SnowComponent } from './components/snow/snow.component';
import { BackActionDirective } from './directives/back-action.directive';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';

@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    LoaderComponent,
    ConfirmModalComponent,
    BackActionDirective,
    SidenavTogglerComponent,
    ImageViewerComponent,
    SnowComponent,
    NumberToArrayPipe,
    ProfileComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    HeaderComponent,
    LoaderComponent,
    ConfirmModalComponent,
    BackActionDirective,
    SidenavTogglerComponent,
    SnowComponent
  ]
})
export class SharedModule {}
