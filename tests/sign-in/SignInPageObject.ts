/**
 * SignInPage.ts
 *
 * Created by jake
 * Created on 2/18/18
 *
 * Sign in page object
 */

import BasePage from '../base/BasePage';
import { ElementFinder } from "protractor";


export default class SignInPageObject extends BasePage {
  signInButton: ElementFinder;
  usernameInput: ElementFinder;
  passwordInput: ElementFinder;

  constructor () {
    super();
    this.signInButton = this.byTid("signInButton");
    this.passwordInput = this.byTid("passwordField");
    this.usernameInput = this.byTid("usernameField");
  }
}
