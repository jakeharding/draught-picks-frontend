/**
 * SignInPage.ts
 *
 * Created by jake
 * Created on 2/18/18
 *
 * Sign in page object.  Used to describe the elements on a page and provide easy interaction with them.
 */

import BasePage from '../base/BasePage';
import { ElementFinder } from "protractor";
import {Input} from "../base/Input";


export default class SignInPageObject extends BasePage {
    submitBtn: ElementFinder;
  usernameInput: Input;
  passwordInput: Input;
  regLink: ElementFinder;
  constructor () {
    super();
    this.submitBtn = this.getElementByTid("signInButton");
    this.passwordInput = new Input("passwordField");
    this.usernameInput = new Input("usernameField");
    this.regLink = this.getElementByTid("registrationLink");
  }
}
