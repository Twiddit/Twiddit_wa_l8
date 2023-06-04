import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { FeedModule } from 'src/app/feed/feed.module';
import { GeneralInfoTwidditsModule } from 'src/app/feed/components/general-info-twiddits/general-info-twiddits.module';
import { FeedComponent } from 'src/app/feed/feed.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { GeneralInfoTwidditsComponent } from 'src/app/feed/components/general-info-twiddits/general-info-twiddits.component';
import { HeaderModule } from 'src/app/header/header.module';



@NgModule({
  declarations: [
    AuthenticationComponent,
    FeedComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    GeneralInfoTwidditsModule
  ]
})
export class AuthenticationModule { }
