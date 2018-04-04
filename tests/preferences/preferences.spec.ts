import {browser, by, element} from 'protractor';
import PreferencesPageObject from './PreferencesPageObject';
import SignInPageObject from '../sign-in/SignInPageObject';

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
    browser.sleep(5000);
    element(by.css(".tab-button")).click();
    //to open the page in the browser
    // browser.get('#/preferences');
    // browser.waitForAngular();
    browser.sleep(5000);
    page = new PreferencesPageObject();
  });
  it('Test submit button', () => {
    page.enterBeerInput.enterText("Blue Moon");
    page.enterAbvHigh.enterText("12");
    page.enterAbvLow.enterText("Low");
    page.enterIbuHigh.enterText("13");
    page.enterIbuLow.enterText("14");
    page.enterTextArea.sendKeys("I LIKE THE CITRUS IN MY BEER! Blue Moon is my most favorite out of any other beer. Testing the submit button");
    page.submitBtn.click();
    page.expectErrorIsDisplayed();
  });

  it('Test add another button', () => {
    page.enterBeerInput.enterText("Budlight");
    page.enterAbvHigh.enterText("25");
    page.enterAbvLow.enterText("30");
    page.enterIbuHigh.enterText("35");
    page.enterIbuLow.enterText("40");
    page.enterTextArea.sendKeys("I fancy a budlight. Testing the addAnother button");
    page.addAnotherBtn.click();
    page.expectErrorIsDisplayed();
  });
});