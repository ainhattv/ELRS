import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Credentials, CredentialsService } from './credentials.service';
import { AUTH_APIS } from './apis';
import { Logger } from '@core';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const logger = new Logger('AuthenticationService');

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private httpClient: HttpClient
  ) { }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    return this.signInApi(context.username, context.password).pipe();
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  private signInApi(userName: string, password: string): Observable<Credentials> {
    const body = {
      userName: userName,
      password: password
    }

    return this.httpClient.post<Credentials>(AUTH_APIS.SIGNIN_API, body);
  }

}
