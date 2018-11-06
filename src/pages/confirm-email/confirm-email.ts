import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BasePage } from "../BasePage";

/**
 * Generated class for the ConfirmEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-email',
  templateUrl: 'confirm-email.html',
})
export class ConfirmEmailPage extends BasePage {
  constructor(public navCtrl: NavController) {
    super('confirm-email');
  }
}
