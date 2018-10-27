import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInPage } from "../sign-in/sign-in";
import { DisclaimerPage } from "../disclaimer/disclaimer";
import { UserProvider } from "../../providers/user/user";
import CheckboxValidator from "../../validators/CheckboxValidator";
import PasswordValidator from "../../validators/PasswordValidator";
import { BasePage } from "../BasePage";

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html',
})
export class RegistrationPage extends BasePage {
  registerForm: FormGroup;
  goToSignInPage: any;
  goToDisclaimerPage: any;
  maxDate: any;
  verifyAge: boolean = false;
  MS_IN_21_YEARS = 662709600000;

  /**
   * RegistrationPage constructor
   * Required constructor for the RegistrationPage class, sets the values maxDate,
   * goToSignInPage, goToDisclaimerPage, and registerForm values accordingly
   * */
  constructor(public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public userProvider: UserProvider ){
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
    }, {validator: PasswordValidator.matches})

  }

  /**
   * dateSelected function
   * No Parameters
   * Verifies the age when selecting their birth date
   * */
  dateSelected() {
    this.registerForm.controls['verify_age'].setValue(true);
  }

  /**
   * createUser function
   * No Parameters
   * Creates a new user after the registration form was submitted and stores
   * all of the registration form values in the database
   * */
  public createUser(){
    this.userProvider.create(this.registerForm.value).then(
      () => {
        this.navCtrl.setRoot(SignInPage);
      }, () => {
        let toast = this.toastCtrl.create({
          message: 'Unable to register at the moment. Please try again.',
          duration: 3000,
          position: "top",
          cssClass: "error-toast"
        });
        toast.present();
      }
    )
  }
}
