import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from '../BasePage';
import { SignInPage } from '../sign-in/sign-in';

/**
 * Generated class for the ConfirmEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'confirm-email',
  segment: 'confirm-email/:key'
})
@Component({
  selector: 'page-confirm-email',
  templateUrl: 'confirm-email.html',
})
export class ConfirmEmailPage extends BasePage {
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    super(`confirm-email/${navParams.get('key')}`);
    console.log(this.navParams);
  }

  ionViewDidEnter() {
    console.log(this.navParams);
  }

  goToSignIn() {
    this.navCtrl.setRoot(SignInPage);
  }
}
