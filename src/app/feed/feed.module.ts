import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '../header/header.module';
import { GeneralInfoTwidditsModule } from './components/general-info-twiddits/general-info-twiddits.module';
import { FeedComponent } from './feed.component';
import { AuthenticationComponent } from '../authentication/authentication/authentication.component';



@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    GeneralInfoTwidditsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] ,
  exports: [
    FeedComponent
  ]
})
export class FeedModule { }
