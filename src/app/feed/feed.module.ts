import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '../header/header.module';
import { GeneralInfoTwidditsModule } from './components/general-info-twiddits/general-info-twiddits.module';
import { FeedComponent } from './feed.component';
import { InfoTwidditsModule } from './info-twiddits/info-twiddits.module';



@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    GeneralInfoTwidditsModule,
    InfoTwidditsModule
  ],
  exports: [
  ]
})
export class FeedModule { }
