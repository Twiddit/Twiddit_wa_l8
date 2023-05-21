import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoTwidditsComponent } from './general-info-twiddits.component';

@NgModule({
  declarations: [
    GeneralInfoTwidditsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GeneralInfoTwidditsComponent
  ]
})
export class GeneralInfoTwidditsModule { }
