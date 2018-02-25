import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginRequired } from '../../providers/auth/auth';
/**
 * Generated class for the PreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@LoginRequired
@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  public showErrorToastWithButton(position: string) {
    console.log('Test : showErrorToastWithButton')
    let toast = this.toastCtrl.create({
      message: 'No network connection, try again later',
      duration: 3000,
      position: "top",
      cssClass: "error-toast"
    });
    toast.present();
  }
}
