/**
 * SignInPage.ts
 *
 * Created by jake
 * Created on 2/18/18
 *
 * Sign in page object
 */

import BasePage from '../base/BasePage';


export default class SignInPageObject extends BasePage {
  signInButton: any;

  constructor () {
    super();
    this.signInButton = this.byTid("signInButton");
  }
}
