import {IonicPage, NavController, ToastController,} from 'ionic-angular';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationPage} from "../registration/registration";

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

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public toastCtrl: ToastController) {
        this.signInForm = formBuilder.group({
            userName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_]*')])],
            password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_]*')])]
        });
  }
  public nextPage() {
      this.navCtrl.push(RegistrationPage);
  }
  public signIn(){
      console.log('Hello World');
      let toast = this.toastCtrl.create({
          message: 'No network connection, try again later',
          duration: 3000,
          position: "top",
          cssClass: "error-toast"
      });
      toast.present();
  }
}

