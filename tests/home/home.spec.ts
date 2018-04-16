import {browser, by, element} from 'protractor';
import SignInPageObject from '../sign-in/SignInPageObject';
import {Input} from "../base/Input";
import HomePageObject from './HomePageObject'
import PreferencesPageObject from "../preferences/PreferencesPageObject";

export const signInProc = () => {
    browser.get('#/sign-in');
    browser.waitForAngular();
    const page = new SignInPageObject();
    browser.sleep(3000);
    page.usernameInput.enterText("qadams2");
    browser.sleep(1000);
    page.passwordInput.enterText("abcd1234");
    browser.sleep(1000);
    page.submitBtn.click();
    browser.sleep(3000);
};

describe('home page test', () => {
  let page: HomePageObject;
  beforeEach(() => {
    signInProc();
    browser.sleep(2000);
    page = new HomePageObject();
    browser.waitForAngular();
    browser.sleep(3000);
  });
  it('Test click recommended segment button', () => {
    browser.sleep(5000);
    page.recommendedSegment.click();
    browser.sleep(5000);
    });
  it('Test click recent segment button', () => {
    browser.sleep(5000);
    page.recentSegment.click();
    browser.sleep(5000);
  });
});