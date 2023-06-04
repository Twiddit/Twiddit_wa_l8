import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnoaComponent } from './unoa.component';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [
    UnoaComponent
  ],
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports: [
    UnoaComponent
  ]
})
export class UnoaModule { }
