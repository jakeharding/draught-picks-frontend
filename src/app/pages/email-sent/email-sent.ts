import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ResendEmailPage } from '../resend-email/resend-email';
import { BasePage } from '../BasePage';

/**
 * Generated class for the EmailSentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-email-sent',
  templateUrl: 'email-sent.html',
  styleUrls: ['./email-sent.scss']
})
export class EmailSentPage extends BasePage {

  resend = ResendEmailPage;

  constructor(public navCtrl: NavController) {
    super('email-sent');
  }

}
