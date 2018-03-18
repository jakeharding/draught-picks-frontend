import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationPage } from "../registration/registration";
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage{
  signInForm: FormGroup;
  goToRegistration: any;
  private username: string;
  private password: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public toastCtrl: ToastController,
              public authProvider: AuthProvider) {
    if (this.authProvider.isLoggedIn()) {
      this.navCtrl.setRoot(TabsPage);
      location.hash = "";
    }
    this.goToRegistration = RegistrationPage;
    this.signInForm = formBuilder.group({
      username: [this.username, Validators.compose([Validators.required])],
      password: [this.password, Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }
  public signIn(){
    this.authProvider.signIn(this.signInForm.value).then(
      (response) => {
        this.authProvider.setToken(response.token);
        this.navCtrl.setRoot(TabsPage);
        location.hash = "";
      },
      () => {
        let toast = this.toastCtrl.create({
          message: 'An error occurred please check your connection and try again.',
          duration: 3000,
          position: "top",
          cssClass: "error-toast"
        });
        toast.present();
      }
    )

  }
}

