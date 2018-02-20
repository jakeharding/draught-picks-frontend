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
describe('Registration tests', function(){

  let page: RegistrationPageObject;

  beforeEach(() => {
    //to open the page in the browser
    browser.get('#/registration');
    browser.waitForAngular();
    page = new RegistrationPageObject();
  });
  it('should check for firstNameInput', function(){
    page.firstNameInput.enterText("First Name");
    });
  it('should check for lastNameInput', function(){
    page.lastNameInput.enterText("Last Name");
  });
  it('should check for emailInput', function(){
      page.emailInput.enterText("test@gmail.com");
    });
  it('should check for passwordInput', function(){
      page.passwordInput.enterText("testpassword123");
  });
  it('should check for passwordInput2', function(){
      page.passwordInput2.enterText("testpassword123");
  });
  // it('should check for birthDate validation', function(){
  //   page.birthDate.click();
  // });
  it('should check for ageVerification checkbox click', function(){
    page.ageVerification.click();
  });
  it('should check for disclaimer checkbox click', function(){
    page.disclaimerVerification.click();
  });
  it('should click Register button ', function(){
    page.registerButton.click();
    page.expectErrorIsDisplayed();
  });
  it('should call goToSignInPage function', function(){
    page.signInLink.click();
  });
});
