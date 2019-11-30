import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastProvider } from '../../services/toast/toast';
import { UserProvider } from '../../services/user/user';
import { BasePage } from '../BasePage';
import { ActivatedRoute } from '@angular/router';

export enum EmailReason {
  RESET = 'reset',
  CONFIRM = 'confirm'
}

interface Reason {
  message: string;
  title: string;
  sendEmail: () => void;
}

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.page.html',
  styleUrls: ['./send-email.page.scss'],
})
export class SendEmailPage extends BasePage {

  REASON_META: any;
  emailForm: FormGroup;
  sendEmail: () => void;
  reason: Reason;

  constructor(public formBuilder: FormBuilder,
              public navCtrl: NavController,
              private toastProvider: ToastProvider,
              private route: ActivatedRoute,
              private userProvider: UserProvider) {
    super(`send-email/${route.snapshot.paramMap.get('reason')}`);
    this.REASON_META = {
      [EmailReason.CONFIRM]: {
        message: 'confirm your email.',
        title: 'Confirm',
        sendEmail: () => this.sendConfirmEmail()
      },
      [EmailReason.RESET]: {
        message: 'reset your password.',
        title: 'Password Reset',
        sendEmail: () => this.sendResetEmail()
      }
    };
    this.reason = this.REASON_META[route.snapshot.paramMap.get('reason')];

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendResetEmail() {
    return this.userProvider.sendPasswordResetEmail(this.emailForm.value.email).then(r =>  {
      this.toastProvider.successToast('The email will arrive soon.');
    }).catch(err => {
      console.error(err);
      this.toastProvider.errorToast('The email cannot be sent at this time. Please check the email address and try again');
    });
  }

  setReason(reason: EmailReason) {
    this.reason = this.REASON_META[reason];
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
