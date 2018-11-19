import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Env from '../../env';
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
**/
@Injectable()
export class UserProvider {
  private readonly url: string;
  private readonly resendConfirmEmailUrl: string;

  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}/users`;
    this.resendConfirmEmailUrl = `${this.url}/resend-confirm-email`;
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

  resendConfirmEmail({email}): Promise<Object> {
    return this.http.post(this.resendConfirmEmailUrl, {email}).toPromise();
  }
}
