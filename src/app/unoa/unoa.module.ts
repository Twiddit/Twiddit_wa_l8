import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnoaComponent } from './unoa.component';
import { HeaderModule } from '../header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UnoaComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UnoaComponent
  ]
})
export class UnoaModule { }
