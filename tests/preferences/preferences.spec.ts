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

import { browser } from 'protractor';
import PreferencesPageObject from './PreferencesPageObject';


describe('preferences page test', () => {

  let page: PreferencesPageObject;

  beforeEach(() => {
    //to open the page in the browser
    browser.get('#/preferences');
    browser.waitForAngular();
    page = new PreferencesPageObject();
  });
  it('Test submit button', () => {
    //TODO enter some input to the fields using the page object
    page.enterBeerInput.enterText("Blue Moon")
    page.enterAbvHigh.enterText("12")
    page.enterAbvLow.enterText("Low")
    page.enterIbuHigh.enterText("13")
    page.enterIbuLow.enterText("14")
    page.enterTextArea.sendKeys("I LIKE THE CITRUS IN MY BEER! Blue Moon is my most favorite out of any other beer. Testing the submit button")
    page.submitBtn.click();
    page.expectErrorIsDisplayed();
  });

  it('Test add another button', () => {
    //TODO enter some input to the fields using the page object
    page.enterBeerInput.enterText("Budlight")
    page.enterAbvHigh.enterText("25")
    page.enterAbvLow.enterText("30")
    page.enterIbuHigh.enterText("35")
    page.enterIbuLow.enterText("40")
    page.enterTextArea.sendKeys("I fancy a budlight. Testing the addAnother button")
    page.addAnotherBtn.click();
    page.expectErrorIsDisplayed();
  });
});