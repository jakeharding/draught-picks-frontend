import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as Env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import AuthResponse from '../../models/AuthResponse';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';

/**
 * Generated class for the AuthProvider provider.
 *
 * See https://angular.io/guide/dependency-injection for more info on providers
 * and Angular DI.
 *
 * Used to authenticate the user
 */

export const TOKEN_STO_KEY = 'draughtPicksToken';


@Injectable({
  providedIn: 'root',
})
export class AuthProvider implements HttpInterceptor, CanActivate {

  signInUrl: string;

  constructor(public http: HttpClient, private navCtrl: NavController) {
    this.signInUrl = `${Env.REST_API_ROOT}/login`;
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isLoggedIn()) {
      this.navCtrl.navigateRoot('sign-in');
    }
    return this.isLoggedIn();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.getToken()}`
        }
      });
    }
    return next.handle(request);
  }

  signIn(creds: any): Promise<AuthResponse> {
    return this.http.post(this.signInUrl, creds).toPromise().then((resp) => {
      return resp as AuthResponse;
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
