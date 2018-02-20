/**
 *
 * Best practice: Add some info about the file at the top in a multi-line comment.
 * This not only helps the next person using the file, but also gives you credit for writing it
 * because you should also add your name as the author. Remove this after you have added your info.
 *
 * Default file headings can be configured in jet brains products so you don't have to write them out every time.
 * I can show you how in person.
 * - Jake
 */

import { browser, by } from 'protractor';

import SignInPageObject from './SignInPageObject';

describe('Sign in tests', () => {

  let page: SignInPageObject;

  beforeEach(() => {
    //to open the page in the browser
    browser.get('#/sign-in');
    browser.waitForAngular();
    page = new SignInPageObject();
  });

  it('should call signIn', () => {
    // Can't use spies in the specs to expect a method has been called
    //TODO enter some input to the fields
    page.usernameInput.enterText("Hello world");
    page.signInButton.click();
    page.expectErrorIsDisplayed();
  });
});
