import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule]
})
export class SharedModule {}
