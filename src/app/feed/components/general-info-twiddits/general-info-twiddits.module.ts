import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoTwidditsComponent } from './general-info-twiddits.component';
import { GraphQLModule } from 'src/app/graphql.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GeneralInfoTwidditsComponent
  ],
  imports: [
    CommonModule,
    GraphQLModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    GeneralInfoTwidditsComponent
  ]
})
export class GeneralInfoTwidditsModule { }
