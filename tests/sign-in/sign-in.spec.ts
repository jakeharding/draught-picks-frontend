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

describe('Sign in tests', () => {

  let page: SignInPageObject;

  beforeEach(() => {
    //to open the page in the browser
    browser.get('#/sign-in');
    browser.waitForAngular();
    page = new SignInPageObject();

  });
  afterEach(function() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
  });
  it('should call signIn', () => {
    page.usernameInput.enterText("Hello world");
    page.passwordInput.enterText("This should be hidden.");
    page.submitBtn.click();
  });


  it('should go to registration page', () => {
    page.regLink.click();
    browser.sleep(1000);
    browser.getCurrentUrl().then((url) => {
      expect(url).toContain('/#/registration');
    });
  });
});
