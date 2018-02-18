import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import {SignInPage} from "../sign-in/sign-in";

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html',
})
export class RegistrationPage {
  goToSignIn: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.goToSignIn = SignInPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  public showErrorToastWithButton(position: string) {
    let toast = this.toastCtrl.create({
      message: 'No network connection, try again later',
      duration: 3000,
      position: "top",
      cssClass: "error-toast"
    });
    toast.present();
  }

}
