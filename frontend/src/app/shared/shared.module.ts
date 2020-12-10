import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [NotFoundComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, HeaderComponent]
})
export class SharedModule {}
