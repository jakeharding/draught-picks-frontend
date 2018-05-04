/**
 *  preferences.spec.ts
 *
 * Test Cases for Preference Page
 *
 * */

import {browser, by, element} from 'protractor';
import PreferencesPageObject from './PreferencesPageObject';
import SignInPageObject from '../sign-in/SignInPageObject';
import {Input} from "../base/Input";

export const signInProc = () => {
  browser.get('#/sign-in');
  browser.waitForAngular();
  const page = new SignInPageObject();
  page.usernameInput.enterText("admin");
  page.passwordInput.enterText("admin");
  page.submitBtn.click();
};

describe('preferences page test', () => {

  let page: PreferencesPageObject;
  beforeEach(() => {
    signInProc();
    browser.sleep(1000);
    // element(by.id("tab-t1-2")).click();
    //to open the page in the browser
    browser.get('#/preferences');
    page = new PreferencesPageObject();
    browser.waitForAngular();
    browser.sleep(1000);
  });
  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });
  it('Test submit button', () => {
    browser.sleep(1000);
    page.enterAbvHigh.enterText("80");
    page.enterAbvLow.enterText("5");
    page.enterIbuHigh.enterText("90");
    page.enterIbuLow.enterText("3");
    page.enterTextArea.sendKeys("I LIKE THE CITRUS IN MY BEER! Blue Moon is my most favorite out of any other beer. Testing the submit button");
    page.submitBtn.click();
    browser.sleep(1000);
  });

  // it('Test add another button', () => {
  //     browser.sleep(5000);
  //     page.enterBeerInput.enterText("Budlight");
  //     browser.sleep(3000);
  //     element(by.tagName("li")).click();
  //     browser.sleep(10000);
  // });

  it('Test AbvInfoButton', () => {
      browser.sleep(1000);
      page.abvInfoButton.click();
      browser.sleep(1000);
      element(by.className("backToPreferences")).click();
      browser.sleep(1000);
  });
  it('Test IbuInfoButton', () => {
      browser.sleep(1000);
      page.ibuInfoButton.click();
      browser.sleep(1000);
      element(by.className("backToPreferences")).click();
      browser.sleep(1000);
  });
  it('Test descInfoButton', () => {
      browser.sleep(1000);
      page.descInfoButton.click();
      browser.sleep(1000);
      element(by.className("backToPreferences")).click();
      browser.sleep(1000);
  });
});