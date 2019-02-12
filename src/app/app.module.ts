import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ChatComponent} from './chat/chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatInputModule, MatNativeDateModule, MatTabsModule, MatToolbarModule,} from '@angular/material';
import {FeedComponent} from './feed/feed.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {PhotoComponent} from './photo/photo.component';
import {DatePipe} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SlideshowModule} from 'ng-simple-slideshow';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ExploreComponent } from './explore/explore.component';
import {TokenInterceptor} from '../core/interceptors/token.interceptor';
import {AuthGuard} from '../core/guards/auth.guard';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'feed', component: FeedComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'explore', component: ExploreComponent},
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '', redirectTo: '/chat', pathMatch: 'full'},
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChatComponent,
    FeedComponent,
    ProfileComponent,
    SettingsComponent,
    PhotoComponent,
    LoginComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SlideshowModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
    // other imports here
  ],
  providers: [
    DatePipe,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
