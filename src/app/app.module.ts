import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { HeaderModule } from './header/header.module';
import { FeedModule } from './feed/feed.module';
import { GeneralInfoTwidditsComponent } from './feed/components/general-info-twiddits/general-info-twiddits.component';
import { GeneralInfoTwidditsModule } from './feed/components/general-info-twiddits/general-info-twiddits.module';
import { UnoaModule } from './unoa/unoa.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderModule,
    FeedModule,
    UnoaModule,
    NgbModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
