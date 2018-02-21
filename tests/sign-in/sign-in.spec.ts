/**
 * sign-in.spec.ts
 *
 * Created by jake
 * Created on 2/18/18
 *
 * Holds test for the sign in page.
 */

import {browser, by} from 'protractor';

import SignInPageObject from './SignInPageObject';
import RegistrationPageObject from "../registration/RegistrationPageObject";

describe('Sign in tests', () => {

  let page: SignInPageObject;
  let redirectPage: RegistrationPageObject;

  beforeEach(() => {
    //to open the page in the browser
    browser.get('#/sign-in');
    browser.waitForAngular();
    page = new SignInPageObject();
    redirectPage = new RegistrationPageObject();

  });

  it('should call signIn', () => {
    page.usernameInput.enterText("Hello world");
    page.passwordInput.enterText("This should be hidden.");
    page.submitBtn.click();
    page.expectErrorIsDisplayed();
  });


  it('should go to registration page', () => {
    page.regLink.click();
    browser.sleep(2000);
    browser.getCurrentUrl().then((url) => {
      expect(url).toContain('/#/registration');
    });
  });
});
