import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import Env from "../../env";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import AuthResponse from "../../models/AuthResponse";

/**
 * Generated class for the AuthProvider provider.
 *
 * See https://angular.io/guide/dependency-injection for more info on providers
 * and Angular DI.
 *
 * Used to authenticate the user
 **/

export const TOKEN_STO_KEY = "draughtPicksToken";


@Injectable()
export class AuthProvider implements HttpInterceptor {

  signInUrl: string;

  constructor(public http: Http) {
    this.signInUrl = `${Env.REST_API_ROOT}/login`;
  }

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.getToken()}`
        }
      });
    }
    return next.handle(request);
  }

  signIn (creds: any): Promise<AuthResponse> {
    return this.http.post(this.signInUrl, creds).map(resp => resp.json()).toPromise().then((resp) => {
      return resp;
    });
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_STO_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_STO_KEY, token);
  }

  clearToken() {
    localStorage.removeItem(TOKEN_STO_KEY);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}

export function LoginRequired (target: Function) {
  const authProvider = Injector.create([{provide: AuthProvider, deps: [] }]).get(AuthProvider);
  target.prototype.ionViewCanEnter = () => {
    if (!authProvider.isLoggedIn()) {
      location.assign('sign-in');
    }
    return authProvider.isLoggedIn();
  };
}
