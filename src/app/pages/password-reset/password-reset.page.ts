import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProvider } from '../../services/user/user';
import { BasePage } from '../BasePage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import PasswordValidator from '../../validators/PasswordValidator';
import { NavController } from '@ionic/angular';
import { ToastProvider } from '../../services/toast/toast';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage extends BasePage {

  token: string;
  loading: boolean;
  b64encoded: string;
  resetForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private userProvider: UserProvider,
              private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private toastProvider: ToastProvider) {
    super('password-reset');
    this.loading = false;
    this.token = route.snapshot.paramMap.get('token');
    this.b64encoded = route.snapshot.paramMap.get('b64encoded');
    this.resetForm = formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', [Validators.required]],
    }, {validators: PasswordValidator.matches});
  }

  changePassword() {
    this.userProvider.changePassword(this.b64encoded, this.token, this.resetForm.value).then(() => {
      return this.toastProvider.successToast('Password has been changed. Please sign in.');
    }).then(() => {
      return this.navCtrl.navigateRoot('/sign-in');
    }).catch(e => {
      console.error('ERROR:', e);
      return this.toastProvider.errorToast('An error occurred. Please try again.');
    });
  }
}
