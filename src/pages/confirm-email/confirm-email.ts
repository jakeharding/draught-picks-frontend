import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from '../BasePage';
import { SignInPage } from '../sign-in/sign-in';
import { UserProvider } from '../../providers/user/user';
import { ResendEmailPage } from '../resend-email/resend-email';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { ToastProvider } from '../../providers/toast/toast';

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
  showResendLink: boolean = false;
  linkText: string = 'Sign in.';
  thankYouMessage: string = 'Thank you for confirming your email!';
  clickMessage: string = 'Please click the link below to sign in.';
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private userProvider: UserProvider,
              private toastProvider: ToastProvider) {
    super(`confirm-email/${navParams.get('key')}`);
  }

  ionViewDidEnter() {
      this.userProvider.confirmEmail(this.navParams.data).catch(err => {
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
    let link: Page = SignInPage;
    if (this.showResendLink) {
      link = ResendEmailPage;
    }
    this.navCtrl.setRoot(link);
  }
}
