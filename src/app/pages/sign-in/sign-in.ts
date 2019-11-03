import { NavController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationPage } from '../registration/registration';
import { AuthProvider } from '../../services/auth/auth';
import { BasePage } from '../BasePage';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignInPage extends BasePage {
  signInForm: FormGroup;
  goToRegistration: any;
  goToResetPassword;
  private username: string;
  private password: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public toastCtrl: ToastController,
              public authProvider: AuthProvider) {
    super('sign-in');
    if (this.authProvider.isLoggedIn()) {
      this.navCtrl.navigateRoot('tabs');
    }
    // this.goToRegistration = RegistrationPage;
    this.signInForm = formBuilder.group({
      username: [this.username, Validators.compose([Validators.required])],
      password: [this.password, Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  /**
   * signIn function
   * No Parameters
   * Gets the username and password values and validates the information then sends
   * user to the home page
   */
  public signIn() {
    this.authProvider.signIn(this.signInForm.value).then(
      (response) => {
        this.authProvider.setToken(response.token);
        this.navCtrl.navigateRoot('tabs');
        // location.hash = '';
      },
      async () => {
        const toast = await this.toastCtrl.create({
          message: 'Unable to sign you in. Have you verified your email address?',
          duration: 3000,
          position: 'top',
          cssClass: 'error-toast'
        });
        await toast.present();
      }
    );

  }
}

