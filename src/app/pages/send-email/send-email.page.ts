import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastProvider } from '../../services/toast/toast';
import { UserProvider } from '../../services/user/user';
import { BasePage } from '../BasePage';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.page.html',
  styleUrls: ['./send-email.page.scss'],
})
export class SendEmailPage extends BasePage {

  emailForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public navCtrl: NavController,
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
        'Email has been sent. Please check you spam folder and visit this page again if you don\'t receive it.');
    }, () => {
      this.toastProvider.errorToast('Unable to send the email. Please check your connection and try again.');
    });
  }

}
