import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { GraphQLModule } from '../graphql.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    GraphQLModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
