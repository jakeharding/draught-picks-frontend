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

  // private RESET_MESSAGE = 'reset your password.';
  // private CONFIRM_MESSAGE = 'confirm your email.';
  private REASON_META = {
    [EmailReason.CONFIRM]: {
      message: 'confirm your email.',
      title: 'Confirm',
      sendEmail: this.sendConfirmEmail
    },
    [EmailReason.RESET]: {
      message: 'reset your password.',
      title: 'Password Reset',
      sendEmail: this.sendResetEmail
    }
  };
  emailForm: FormGroup;
  sendEmail: () => void;
  reason: Reason;

  constructor(public formBuilder: FormBuilder,
              public navCtrl: NavController,
              private toastProvider: ToastProvider,
              private route: ActivatedRoute,
              private userProvider: UserProvider) {
    super(`send-email/${route.snapshot.paramMap.get('reason')}`);
    console.log('REASON:', route.snapshot.paramMap.get('reason'));
    this.reason = this.REASON_META[route.snapshot.paramMap.get('reason')];

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendResetEmail() {
    //TODO
    console.log('RESET');
  }

  setReason(reason: EmailReason) {
    this.reason = this.REASON_META[reason];
    // this.reason = reason;
    // this.showForm = true;
    // if (this.reason === EmailReason.CONFIRM) {
    //   this.reasonMessage = this.CONFIRM_MESSAGE;
    // } else {
    //   this.reasonMessage = this.RESET_MESSAGE;
    // }
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
