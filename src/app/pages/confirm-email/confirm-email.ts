import { Component } from '@angular/core';
import {  NavController, NavParams } from '@ionic/angular';
import { BasePage } from '../BasePage';
import { SignInPage } from '../sign-in/sign-in';
import { UserProvider } from '../../services/user/user';
import { ResendEmailPage } from '../resend-email/resend-email';
import { ToastProvider } from '../../services/toast/toast';

/**
 * Generated class for the ConfirmEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirm-email',
  templateUrl: 'confirm-email.html',
  styleUrls: ['confirm-email.ts']
})
export class ConfirmEmailPage extends BasePage {
  showResendLink = false;
  linkText = 'Sign in.';
  thankYouMessage = 'Thank you for confirming your email!';
  clickMessage = 'Please click the link below to sign in.';
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private userProvider: UserProvider,
              private toastProvider: ToastProvider) {
    super(`confirm-email/${navParams.get('key')}`);
  }

  ionViewDidEnter() {
      this.userProvider.confirmEmail(this.navParams.data as { key }).catch(err => {
        this.showResendLink = this.isClientError(err.status);
        if (this.showResendLink) {
          this.thankYouMessage = err.error.confirm_key;
          this.clickMessage = 'Click the link below to resend the confirmation email.';
          this.linkText = 'Resend confirmation email';
        } else {
          this.toastProvider.errorToast();
          this.thankYouMessage = ToastProvider.defaultErrorMsg;
        }
        return err;
      });
  }

  goToLink() {
    let link = 'sign-in';
    if (this.showResendLink) {
      link = 'resend-email';
    }
    this.navCtrl.navigateRoot(link);
  }
}
