import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResendEmailPage } from "../resend-email/resend-email";
import { BasePage } from "../BasePage";

/**
 * Generated class for the EmailSentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email-sent',
  templateUrl: 'email-sent.html',
})
export class EmailSentPage extends BasePage {

  resend = ResendEmailPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super('email-sent');
  }

}
