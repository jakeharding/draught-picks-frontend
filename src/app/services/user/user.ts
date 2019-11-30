import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as Env } from '../../../environments/environment';
import PageResponse from '../../models/PageResponse';
import User from '../../models/User';
import AuthResponse from '../../models/AuthResponse';
import BeerRating from '../../models/BeerRating';
import Beer from '../../models/Beer';

/**
 * Generated class for the UserProvider provider.
 *
 * See https://angular.io/guide/dependency-injection for more info on providers
 * and Angular DI.
 */
@Injectable({
  providedIn: 'root',
})
export class UserProvider {
  private readonly url: string;
  private readonly resendConfirmEmailUrl: string;
  private readonly confirmEmailUrl: string;
  private readonly passwordResetUrl: string;

  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}/users`;
    this.resendConfirmEmailUrl = `${this.url}/resend-confirm-email`;
    this.confirmEmailUrl = `${this.url}/confirm-email`;
    this.passwordResetUrl = `${this.url}/reset-email`;
  }

  create(userData: AuthResponse | Beer | BeerRating | User) {
    return this.http.post(this.url, userData).toPromise();
  }

  retrieve() {
    return this.http.get(this.url).toPromise().then(({ results }: PageResponse<User>) => {
      return results[0];
    });
  }

  update(user: User): Promise<any> {
    return this.http.put(`${this.url}/${user.uuid}`, user).toPromise();
  }

  resendConfirmEmail({email}): Promise<object> {
    return this.http.post(this.resendConfirmEmailUrl, {email}).toPromise();
  }

  confirmEmail({key}): Promise<any> {
    return this.http.put(this.confirmEmailUrl, {confirm_key: key}).toPromise();
  }

  sendPasswordResetEmail(emailAddress: string): Promise<any> {
    return this.http.post(this.passwordResetUrl, {email: emailAddress}).toPromise();
  }
}
