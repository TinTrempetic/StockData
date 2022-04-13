import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  public getUserData(): Observable<User> {
    return this.auth.user$;
  }

  public isAuthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  public isLoading(): Observable<boolean> {
    return this.auth.isLoading$;
  }
}
