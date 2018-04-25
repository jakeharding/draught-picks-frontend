/**
 * registration.spec.ts
 *
 * Created by Jordan Fay
 * Created on 2/19/2018
 *
 * This will test the registration page by testing the UI
 */

import { browser } from 'protractor';
import {$$, by, element, ElementFinder} from 'protractor';

import RegistrationPageObject from './RegistrationPageObject';
import {describe} from "selenium-webdriver/testing";
import DisclaimerPageObject from "../disclaimer/DisclaimerPageObject";
describe('Registration tests', () => {

  let page: RegistrationPageObject;

  beforeEach(() => {
    //to open the page in the browser
    browser.get('#/registration');
    browser.waitForAngular();
    page = new RegistrationPageObject();
  });
  afterEach(function() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
  });
  it('should check for firstNameInput', () => {
    page.firstNameInput.enterText("First Name");
    page.lastNameInput.enterText("Last Name");
    page.usernameInput.enterText("User Name");
    page.emailInput.enterText("test@gmail.com");
    page.passwordInput.enterText("testpassword123");
    page.passwordInput2.enterText("testpassword123");
    page.birthDate.click();
    browser.sleep(1000);
    page.closeDatePicker();
    browser.sleep(1000);
    page.disclaimerVerification.click();
    browser.sleep(1000);
    page.getElementByTid("disclaimerVerified").click();
    browser.sleep(1000);
    page.registerButton.click();
    browser.sleep(1000);
    });
  it('should call goToSignInPage function', () => {
    page.signInLink.click();
    browser.sleep(2000);
    browser.getCurrentUrl().then((url) => {
      expect(url).toContain('#/sign-in');
    });
  });
});
