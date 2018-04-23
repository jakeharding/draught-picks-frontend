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
    page.usernameInput.enterText("qadams3");
    browser.sleep(2000);
    page.passwordInput.enterText("abcd1234");
    browser.sleep(2000);
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

  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });
  it('Test click recommended segment button', () => {
    browser.sleep(3000);
    page.recommendedSegment.click();
    browser.sleep(3000);
  });
  it('Test click recent segment button', () => {
    browser.sleep(3000);
    page.recentSegment.click();
    browser.sleep(3000);
  });
  it('Test click toSearch', () => {
    browser.sleep(3000);
    page.toSearchPage.click();
    browser.sleep(3000);
  });
  // it('Click a beer-item', () => {
  //   browser.sleep(3000);
  //   page.beerItem.click();
  //   browser.sleep(3000);
  // });
});