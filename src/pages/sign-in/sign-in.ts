import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationPage } from "../registration/registration";
import { UserProvider } from "../../providers/user/user";

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
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public toastCtrl: ToastController,
              public userProvider: UserProvider) {
    this.goToRegistration = RegistrationPage;
    this.signInForm = formBuilder.group({
      userName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_]*')])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_]*')])]
    });
  }
  public signIn(){
    let toast = this.toastCtrl.create({
      message: 'No network connection, try again later',
      duration: 3000,
      position: "top",
      cssClass: "error-toast"
    });
    toast.present();
  }
}

