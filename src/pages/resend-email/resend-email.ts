import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup} from "@angular/forms";
import { BasePage } from "../BasePage";

/**
 * Generated class for the ResendEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resend-email',
  templateUrl: 'resend-email.html',
})
export class ResendEmailPage extends BasePage {

  emailForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super('resend-email');
  }

}
