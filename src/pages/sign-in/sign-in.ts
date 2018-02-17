import { IonicPage, NavController, } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { OnInit } from '@angular/core';
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
export class SignInPage implements OnInit{
  signInForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
        this.signInForm = formBuilder.group({
            userName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_]*')])],
            password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_]*')])]
        });
  }

}

