import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SignInPage} from "../sign-in/sign-in";
import {UserProvider} from "../../providers/user/user";

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
export class RegistrationPage {
  registerForm: FormGroup;
  goToSignInPage: any;
  constructor(public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public userProvider: UserProvider ){

    this.goToSignInPage = SignInPage;
    this.registerForm = formBuilder.group({
      first_name: ['', Validators.compose([Validators.maxLength(30)])],
      last_name: ['', Validators.compose([Validators.maxLength(30)])],
      date_of_birth: ['', Validators.compose([Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.maxLength(30)])],
      username: ['', Validators.compose([Validators.maxLength(30)])]
    })

  }

  public createUser(){
    this.userProvider.createUser(this.registerForm.value).subscribe(
      (response) => {
        location.replace("#/sign-in");
      }
    )
  }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RegistrationPage');
  // }

  public showErrorToastWithButton(userProvider: UserProvider, position: string){
    //this.userProvider.subscribe();
    let toast = this.toastCtrl.create({
      message: 'No network connection, try again later',
      duration: 3000,
      position: "top",
      cssClass: "error-toast"
    });
    toast.present();
  }

}
