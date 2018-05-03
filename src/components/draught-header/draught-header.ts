import { Component } from '@angular/core';
import {AuthProvider} from "../../providers/auth/auth";
import {TabsPage} from "../../pages/tabs/tabs";
import {NavController} from "ionic-angular";

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

  constructor(public authProvider: AuthProvider, public navCtrl: NavController) {
    this.isLoggedIn = this.authProvider.isLoggedIn();
  }
  /**
   * logout function
   * No parameters
   * Sends current logged in user to sign in page
   * */
  logout () {
    this.authProvider.clearToken();
    location.hash = '/sign-in';
  }
  /**
   * home function
   * No parameters
   * Sends current logged in user to the home page
   * */
  home () {
    if (this.authProvider.isLoggedIn()) {
      location.hash = '/';
      if (this.navCtrl.parent) {
        this.navCtrl.parent.select(1);
      } else {
        location.replace('/');
      }
    }
  }

}
