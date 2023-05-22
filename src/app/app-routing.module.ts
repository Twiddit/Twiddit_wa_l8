import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { FeedComponent } from './feed/feed.component';
import { InfoTwidditsComponent } from './feed/info-twiddits/info-twiddits.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'feed/info-twiddit', component: InfoTwidditsComponent, data: {id: '', username: ''}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
