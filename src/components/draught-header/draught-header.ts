import { Component } from '@angular/core';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the DraughtHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'draught-header',
  templateUrl: 'draught-header.html'
})
export class DraughtHeaderComponent {

  isLoggedIn: boolean;

  constructor(public authProvider: AuthProvider) {
    this.isLoggedIn = this.authProvider.isLoggedIn();
  }

  logout () {
    this.authProvider.clearToken();
    location.hash = '/sign-in';
  }

}
