import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoTwidditsComponent } from './general-info-twiddits.component';
import { GraphQLModule } from 'src/app/graphql.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    GeneralInfoTwidditsComponent
  ],
  imports: [
    CommonModule,
    GraphQLModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    GeneralInfoTwidditsComponent
  ]
})
export class GeneralInfoTwidditsModule { }
