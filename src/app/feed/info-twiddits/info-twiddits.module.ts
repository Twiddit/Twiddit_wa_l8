import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoTwidditsComponent } from './info-twiddits.component';
import { HeaderModule } from 'src/app/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InfoTwidditsComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    InfoTwidditsComponent
  ]
})
export class InfoTwidditsModule { }
