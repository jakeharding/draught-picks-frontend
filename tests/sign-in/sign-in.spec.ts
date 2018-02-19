import { browser, by } from 'protractor';

import SignInPageObject from './SignInPageObject';

describe('Sign in tests', () => {

  // it('Check Max of username', function() {
  //
  // });
  // it('Check Max of username and password', function() {
  //
  // });

  let page: SignInPageObject;

  beforeEach(() => {
    //to open the page in the browser
    browser.get('#/sign-in');
    browser.waitForAngular();
    page = new SignInPageObject();
  });
  it('should call signIn', () => {
    // Can't use spies in the specs to expect a method has been called
    //TODO enter some input to the fields and maybe slow the tests down for the demo using browser.sleep
    page.signInButton.click();
    expect(by.css('.error-toast')).toBeTruthy()
  });
});
