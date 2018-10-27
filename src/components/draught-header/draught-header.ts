import { Component } from '@angular/core';
import { AuthProvider } from "../../providers/auth/auth";
import { NavController } from "ionic-angular";
import { SignInPage } from "../../pages/sign-in/sign-in";
import { HomePage } from "../../pages/home/home";

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
    this.navCtrl.setRoot(SignInPage);
  }

  /**
   * home function
   * No parameters
   * Sends current logged in user to the home page
   * */
  home () {
    if (this.authProvider.isLoggedIn()) {
      this.navCtrl.setRoot(HomePage);
    } else {
      this.navCtrl.setRoot(SignInPage);
    }
  }


}
