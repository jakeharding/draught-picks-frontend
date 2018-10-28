import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BasePage } from "../BasePage";
import { UserProvider } from "../../providers/user/user";
import { ToastProvider } from "../../providers/toast/toast";

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

  constructor(public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              private toastProvider: ToastProvider,
              private userProvider: UserProvider) {
    super('resend-email');
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendConfirmEmail() {
    this.userProvider.resendConfirmEmail(this.emailForm.value).then(() => {
      this.toastProvider.successToast(
        "Email has been sent. Please check you spam folder and visit this page again if you don't receive it.")
    }, () => {
      this.toastProvider.errorToast("Unable to send the email. Please check your connection and try again.")
    });
  }

}
