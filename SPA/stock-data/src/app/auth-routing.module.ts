import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';

const config = {
  domain: 'dev-y345p4uq.us.auth0.com',
  clientId: 'SiNu7svHDXUOj6qojCB2Xq1c5Ndad9AL',
  redirectUri: window.location.origin,
  httpInterceptor: {
    allowedList: ['/api/*'],
  },
};

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: AppComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule.forRoot(config),
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
