/**
 * RegistrationPageObject.ts
 *
 * Created by J-Fay
 * Created on 2/19/2018
 */

import BasePage from '../base/BasePage';
import {ElementFinder} from "protractor";
import {Input} from "../base/Input";

export default class RegistrationPageObject extends BasePage {
  firstNameInput: Input;
  lastNameInput: Input;
  emailInput: Input;
  passwordInput: Input;
  passwordInput2: Input;
  birthDate: ElementFinder;
  ageVerification: ElementFinder;
  disclaimerVerification: ElementFinder;
  registerButton: ElementFinder;
  signInLink: ElementFinder;

  constructor() {
    super();
    this.firstNameInput = new Input("firstNameInput");
    this.lastNameInput = new Input("lastNameInput");
    this.emailInput = new Input("emailInput");
    this.passwordInput = new Input("passwordInput");
    this.passwordInput2 = new Input("passwordInput2");
    this.birthDate = this.getElementByTid("birthDate");
    this.ageVerification = this.getElementByTid("ageVerification");
    this.registerButton = this.getElementByTid('registerButton');
    this.signInLink = this.getElementByTid('signInLink');
    this.disclaimerVerification = this.getElementByTid('disclaimerVerification');
  }
}
