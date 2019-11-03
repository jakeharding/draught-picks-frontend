import { Component } from '@angular/core';
import { AuthProvider } from '../../services/auth/auth';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

/**
 * Generated class for the DraughtHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'draught-header',
  templateUrl: 'draught-header.html',
  styleUrls: ['./draught-header.scss']
})
export class DraughtHeaderComponent {

  isLoggedIn: boolean;

  constructor(public authProvider: AuthProvider, public navCtrl: NavController, public router: ActivatedRoute) {
    this.isLoggedIn = this.authProvider.isLoggedIn();
  }

  /**
   * logout function
   * No parameters
   * Sends current logged in user to sign in page
   */
  logout() {
    this.authProvider.clearToken();
    this.navCtrl.navigateRoot('sign-in');
  }

  /**
   * home function
   * No parameters
   * Sends current logged in user to the home page
   */
  async home() {
    if (this.authProvider.isLoggedIn()) {
      await this.navCtrl.navigateRoot('/tabs/home');
    } else {
      await this.navCtrl.navigateRoot('sign-in');
    }
  }


}
