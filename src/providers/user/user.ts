import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import Env from '../../env';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  signInUrl: string;

  constructor(public http: HttpClient) {
    this.signInUrl = `${Env.REST_API_ROOT}login`;
    console.log(this.signInUrl);
  }

  signIn (creds: any): Observable<any> {
    return this.http.post(Env.REST_API_ROOT, creds);
  }

}
