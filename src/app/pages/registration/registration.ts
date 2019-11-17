import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInPage } from '../sign-in/sign-in';
import { DisclaimerPage } from '../disclaimer/disclaimer';
import { UserProvider } from '../../services/user/user';
import CheckboxValidator from '../../validators/CheckboxValidator';
import PasswordValidator from '../../validators/PasswordValidator';
import { BasePage } from '../BasePage';
import { ToastProvider } from '../../services/toast/toast';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  styleUrls: ['./registration.scss']
})
export class RegistrationPage extends BasePage {
  registerForm: FormGroup;
  goToSignInPage: any;
  goToDisclaimerPage: any;
  maxDate: any;
  verifyAge = false;
  MS_IN_21_YEARS = 662709600000;

  /**
   * RegistrationPage constructor
   * Required constructor for the RegistrationPage class, sets the values maxDate,
   * goToSignInPage, goToDisclaimerPage, and registerForm values accordingly
   */
  constructor(public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public toastProvider: ToastProvider,
              public userProvider: UserProvider ) {
    super('registration');
    this.maxDate = new Date(Date.now() - this.MS_IN_21_YEARS).toISOString();
    this.goToSignInPage = SignInPage;
    this.goToDisclaimerPage = DisclaimerPage;
    this.registerForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      verify_age: [this.verifyAge, [CheckboxValidator.isChecked, Validators.required]],
      disclaimer_check: [undefined, [CheckboxValidator.isChecked, Validators.required]]
    }, {validator: PasswordValidator.matches});

  }

  /**
   * dateSelected function
   * No Parameters
   * Verifies the age when selecting their birth date
   */
  dateSelected() {
    this.registerForm.controls.verify_age.setValue(true);
  }

  /**
   * createUser function
   * No Parameters
   * Creates a new user after the registration form was submitted and stores
   * all of the registration form values in the database
   */
  public async createUser() {
    console.log(this.registerForm.value.date_of_birth.substring(0, 10));
    this.registerForm.value.date_of_birth = this.registerForm.value.date_of_birth.substring(0, 10);
    await this.userProvider.create(this.registerForm.value).then(
      () => {
        this.navCtrl.navigateRoot('/email-sent');
      }, () => {
        this.toastProvider.errorToast();
      }
    );
  }
}
