import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { FeedComponent } from './feed/feed.component';
import { InfoTwidditsComponent } from './feed/info-twiddits/info-twiddits.component';
import { UnoaComponent } from './unoa/unoa.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent }, //Es AuthenticationComponent, solo probando
  { path: 'feed', component: FeedComponent },
  { path: 'feed/info-twiddit', component: InfoTwidditsComponent, data: {id: '', username: ''}},
  { path: 'feed/interface', component: UnoaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
