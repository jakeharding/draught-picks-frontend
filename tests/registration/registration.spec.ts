/**
 * registration.spec.ts
 *
 * Created by Jordan Fay
 * Created on 2/19/2018
 *
 * This will test the registration page by testing the UI
 */

import { browser } from 'protractor';

import RegistrationPageObject from './RegistrationPageObject';
import {describe} from "selenium-webdriver/testing";
describe('Registration tests', () => {

  let page: RegistrationPageObject;

  beforeEach(() => {
    //to open the page in the browser
    browser.get('#/registration');
    browser.waitForAngular();
    page = new RegistrationPageObject();
  });
  it('should check for firstNameInput', () => {
    page.firstNameInput.enterText("First Name");
    page.lastNameInput.enterText("Last Name");
    page.emailInput.enterText("test@gmail.com");
    page.passwordInput.enterText("testpassword123");
    page.passwordInput2.enterText("testpassword123");
    page.ageVerification.click();
    page.disclaimerVerification.click();
    page.registerButton.click();
    page.expectErrorIsDisplayed();
    });
  it('should call goToSignInPage function', () => {
    page.signInLink.click();
  });
});
