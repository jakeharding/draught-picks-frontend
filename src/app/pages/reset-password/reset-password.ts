import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { BasePage } from '../BasePage';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage extends BasePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super('reset-password');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
