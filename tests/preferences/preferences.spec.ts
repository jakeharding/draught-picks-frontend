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


describe('preferences page test', function() {

  let page: PreferencesPageObject;

  beforeEach(() => {
    //to open the page in the browser
    browser.get('#/preferences');
    browser.waitForAngular();
    page = new PreferencesPageObject();
  });

  it('Test submit button', function() {
    //TODO enter some input to the fields using the page object
    //page.submitBtn.click();
   // page.expectErrorIsDisplayed();
  });
});